#include <iostream>

#include <emscripten.h>

#include <q/pitch/pitch_detector.hpp>

namespace q = cycfi::q;

class PitchDetector {
public:
  // todo(brhenrique): what are the lowest and highest frequencies to use?
  PitchDetector(q::frequency lowest_freq, q::frequency highest_freq,
                uint32_t sps, float *input)
      : highest_freq_(highest_freq), pd_(lowest_freq, highest_freq, sps),
        pp_(q::pd_preprocessor::config{}, lowest_freq, highest_freq, sps),
        input_(input) {}

  float Run(size_t input_size) {
    for (size_t i = 0; i != input_size; i++) {
      pd_(pp_(input_[i]));
    }

    return pd_.get_frequency();
  }

private:
  q::frequency highest_freq_;
  q::pitch_detector pd_;
  q::pd_preprocessor pp_;
  float *input_;
};

float inputBuffer[96000]; // arbitrary
q::frequency lowest_freq(30);
q::frequency highest_freq(250);
std::unique_ptr<PitchDetector> pd;

extern "C" {
EMSCRIPTEN_KEEPALIVE
float *getInputMemoryOffset() { return inputBuffer; }

EMSCRIPTEN_KEEPALIVE
void init(uint32_t sample_rate) {
  pd = std::make_unique<PitchDetector>(lowest_freq, highest_freq, sample_rate,
                                       inputBuffer);
}

EMSCRIPTEN_KEEPALIVE
float run(size_t size) {
  if (pd) {
    return pd->Run(size);
  }

  return -1;
}
}
