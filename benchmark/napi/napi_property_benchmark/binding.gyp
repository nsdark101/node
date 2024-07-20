{
  "targets": [
    {
      "target_name": "napi_property_benchmark",
      "sources": [
        "binding.c"
      ],
      "cflags": ["-std=c++11"],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
