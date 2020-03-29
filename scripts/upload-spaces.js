const path = require('path');
const fs = require('fs');

function createSpacesUploader(options = {}) {
  if (options.keepAlive) process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED=1;

  const { S3, Endpoint, Credentials } = require('aws-sdk');

  const spaces = new S3({
    endpoint: new Endpoint(options.endpoint),
    credentials: new Credentials(options.accessKey, options.secretKey, null),
    params: options.params,
  });

  return function upload({
    filename, pathname, content, contentType, contentLength, bucket = options.bucket, acl = options.acl
  } = {}) {
    const params = {
      ACL: acl,
      Bucket: bucket,
      Key: pathname,
      ContentLength: contentLength,
      ContentType: contentType,
      Body: content || fs.createReadStream(filename),
    };
    return spaces.upload(params).promise();
  }
}

function traverseDirectoryFiles(pathname, files = []) {
  const stats = fs.statSync(pathname);

  if (stats.isDirectory()) {
    fs.readdirSync(pathname).forEach(filename => {
      traverseDirectoryFiles(`${pathname}/${filename}`, files);
    });
  } else if (stats.isFile()) {
    files.push({ filename: pathname, size: stats.size });
  } else if (stats.isSymbolicLink()) {
    traverseDirectoryFiles(fs.realpathSync(pathname), files);
  }

  return files;
}

function processFiles(files = [], options = {
  getContentType: filename => filename,
  getPathname: filename => filename,
  filter: filename => !!filename,
  // TODO: allow final transforms of source for secret things
  transform: content => content,
}) {
  return files
    .filter(({ filename }) => options.filter(filename))
    .map(({ filename, size }) => ({
      filename,
      ContentLength: size,
      contentType: options.getContentType(filename),
      pathname: options.getPathname(filename),
    }));
}

(async function start({
  root,
  keepAlive,
  redact,
  acl,
  bucket,
  endpoint,
  accessKey,
  secretKey,
}) {
  const filesToUpload = processFiles(traverseDirectoryFiles(root), {
    getContentType: filename =>
      // TODO: support more than just js/json
      filename.endsWith('json') ? 'application/json' : 'application/javascript',
    getPathname: filename => filename.replace(`${root}/`, ''),
    filter: filename => filename.endsWith('map') === false,
  });

  const upload = createSpacesUploader({
    accessKey,
    secretKey,
    endpoint,
    bucket,
    acl,
    keepAlive,
  });

  // TODO: progress of large uploads
  const uploads = await Promise.all(filesToUpload.map(upload));

  const outputToLog = uploads.map(({ Location }) =>
    redact
      ? Location.replace(bucket, '[bucket]').replace(endpoint, '[endpoint]')
      : Location,
  );

  console.log('Files uploaded successfully', outputToLog);
})({
  root: path.resolve(__dirname, '..', 'static'),
  keepAlive: true,
  redact: true,
  acl: 'public-read',
  bucket: process.env.SPACES_BUCKET,
  endpoint: process.env.SPACES_ENDPOINT,
  accessKey: process.env.SPACES_ACCESS_KEY,
  secretKey: process.env.SPACES_SECRET_KEY,
});
