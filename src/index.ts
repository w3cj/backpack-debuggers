import app from './app';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`View monsters now: http://localhost:${port}/api/v1/monsters`);
  /* eslint-enable no-console */
});
