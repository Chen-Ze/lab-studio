module.exports = {
  displayName: 'front-experiments-apply-current-keithley-6221-renderer',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/front/experiments/apply-current-keithley-6221-renderer',
};
