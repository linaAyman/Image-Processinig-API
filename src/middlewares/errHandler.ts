import express from 'express';

const errHandler = (req: express.Request, res: express.Response): void => {
  res.send('<h2>There is an error in the endpoint you entered</h2>');
};
export default errHandler;
