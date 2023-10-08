#!/bin/sh

set -e

proto_dir="src/proto"

rm -rf -- \
  "${proto_dir:?}"/*.ts \
  "${proto_dir:?}"/*.js \
  "${proto_dir:?}"/*/

npx proto-loader-gen-types \
  --longs=String \
  --enums=String \
  --defaults \
  --oneofs \
  --grpcLib="@grpc/grpc-js" \
  --outDir="${proto_dir:?}" \
  "${proto_dir:?}/"*.proto
