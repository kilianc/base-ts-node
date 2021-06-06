#!/bin/bash

set -e

proto_dir="src/proto"

# generate javascript code
yarn grpc_tools_node_protoc \
  --js_out="import_style=commonjs,binary:${proto_dir}" \
  --grpc_out="${proto_dir}" \
  --plugin="protoc-gen-grpc=$(yarn bin grpc_tools_node_protoc_plugin)" \
  -I "${proto_dir}" \
  "${proto_dir}"/*.proto

# generate typescript ambient declaration (d.ts)
yarn grpc_tools_node_protoc \
  --plugin="protoc-gen-ts=$(yarn bin protoc-gen-ts)" \
  --ts_out="${proto_dir}" \
  -I "${proto_dir}" \
  "${proto_dir}"/*.proto
