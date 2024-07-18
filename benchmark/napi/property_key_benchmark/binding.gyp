{
  "targets": [
    {
      "target_name": "test_napi",
      "sources": [
        "src/js_native_api_v8.cc",
        "src/js_native_api.h"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      "defines": [
        "NAPI_EXPERIMENTAL"
      ],
      "dependencies": [
        "<!(node -p \"require.resolve('node-addon-api')\")"
      ]
    }
  ]
}
