import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const doc = yaml.load(
    fs.readFileSync(path.resolve(__dirname, './weather.yaml'), 'utf8')
  ) as object;

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
}
