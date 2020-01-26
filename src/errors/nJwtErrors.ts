export const nJwtErrors = {
  PARSE_ERROR: 'Jwt cannot be parsed',
  EXPIRED: 'Jwt is expired',
  UNSUPPORTED_SIGNING_ALG: 'Unsupported signing algorithm',
  SIGNING_KEY_REQUIRED: 'Signing key is required',
  SIGNATURE_MISMTACH: 'Signature verification failed',
  SIGNATURE_ALGORITHM_MISMTACH: 'Unexpected signature algorithm',
  NOT_ACTIVE: 'Jwt not active',
  KEY_RESOLVER_ERROR: 'Error while resolving signing key for kid "%s"',
}
