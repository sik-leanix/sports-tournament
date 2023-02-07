import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { Tournament } from '../../controllers/tournaments/tournament-type';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tournament').del();

  // Inserts seed entries
  await knex('tournament').insert<Tournament>([
    {
      id: uuidv4(),
      url_slug: 'wimbledon2022',
      name: 'Wimbledon',
      player_code: '1234',
      admin_code: '3456',
      description: `
        Schön, dass Sie neugierig reinschauen,obwohl hier ja eigentlich noch gar kein
        richtiger Text steht, sondern nur der
        sogenannte Blindtext. Der aber soll
        Ihnen diesmal mehr Spass machen als
        das`
    }
  ]);
}
