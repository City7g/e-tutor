import Dotenv from 'dotenv-webpack'

export default {
  mode: process.env.NODE_ENV,
  output: {
    filename: 'main.js',
  },
  plugins: [new Dotenv()],
}
