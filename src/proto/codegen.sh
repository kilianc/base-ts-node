#!/bin/bash

set -e

proto_dir="src/proto"
npm_bin=$(npm bin)

# generate javascript code
"$npm_bin/grpc_tools_node_protoc" \
  --js_out="import_style=commonjs,binary:${proto_dir}" \
  --grpc_out="${proto_dir}" \
  --plugin="protoc-gen-grpc=$npm_bin/grpc_tools_node_protoc_plugin" \
  -I "${proto_dir}" \
  "${proto_dir}"/*.proto

# generate typescript ambient declaration (d.ts)
"$npm_bin/grpc_tools_node_protoc" \
  --plugin="protoc-gen-ts=$npm_bin/protoc-gen-ts" \
  --ts_out="${proto_dir}" \
  -I "${proto_dir}" \
  "${proto_dir}"/*.proto
