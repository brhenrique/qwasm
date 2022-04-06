cmake_minimum_required(VERSION 3.5.1)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(q_wasm)

add_executable(q_wasm pitch-detector.cpp)

set(Q_BUILD_EXAMPLES OFF)
set(Q_BUILD_TEST OFF)
set(Q_BUILD_IO OFF)
add_subdirectory(q)

set_target_properties(q_wasm PROPERTIES LINK_FLAGS "-O1 -s WASM=1 -s BINARYEN_ASYNC_COMPILATION=0 -s SINGLE_FILE=1 --post-js em-es6-module.js")
set_target_properties(q_wasm
        PROPERTIES
        RUNTIME_OUTPUT_DIRECTORY build
        )
target_include_directories(q_wasm PRIVATE /Users/brhenrique/dev/emsdk/upstream/emscripten/cache/sysroot/include)
target_link_libraries(q_wasm libq)
