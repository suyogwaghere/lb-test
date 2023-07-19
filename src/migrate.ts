import {LbTestApplication} from './application';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new LbTestApplication();
  await app.boot();
  await app.migrateSchema({existingSchema ,models: ['Students','Courses','Department','Address','Enrollment','Roles','User','Job']});

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even afdter all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
