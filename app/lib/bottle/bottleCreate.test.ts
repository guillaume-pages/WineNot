import { createBottle } from './bottle.create';
import { prismaMock } from '@/singleton';
import { v4 as uuidv4 } from 'uuid';

const mockUUID = uuidv4();

const mockBottleData = {
  bottle_name: 'Bouteille de test',
  millesime: 2020,
  type_of_wine: 'Rouge',
  size: 'Standard 75 cl',
  grape_varieties: ['Syrah', 'Grenache'],
  region: 'Bordeaux',
  eye_description: 'Robe rubis intense.',
  nose_description: ['Fruits rouges', 'Epices', 'Café'],
  mouth_description: [75, 38, 35, 67, 82, 62],
  carafage: 25,
  temperature: 13,
  degree: 10.9,
  accompaniment: ['Fromage', 'Viande'],
  media: '',
  price: 14.99,
  price_visibility: 2,
  global_description: 'Ce type de vin est idéal pour une grande occasion.',
  entry_date: new Date('2024-08-22'),
  potential_date: new Date('2024-08-31'),
  quantity: 3,
  global_visibility: 2,
  cellar_id: mockUUID,
};

describe('createBottle', () => {
  beforeEach(() => {
    prismaMock.bottles.create.mockReset();
    prismaMock.bottles_cellars.create.mockReset();
  });

  it('Devrait retourner une erreur si le nom de la bouteille est nulle', async () => {
    const invalidData = { ...mockBottleData, bottle_name: '' };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain(
      'Le nom de la bouteille ne doit pas être vide.',
    );
  });

  it('Devrait retourner une erreur si les cépages contiennent des caractères non autorisés', async () => {
    const invalidData = {
      ...mockBottleData,
      grape_varieties: ['Invalid#Variety'],
    };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain(
      'Les cépages ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    );
  });

  it('Devrait retourner une erreur si les accompagnements contiennent des caractères non autorisés', async () => {
    const invalidData = {
      ...mockBottleData,
      accompaniment: ['Invalid#Variety'],
    };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain(
      'Les accords ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    );
  });

  it('Devrait retourner une erreur si les descriptions olfactives contiennent des caractères non autorisés', async () => {
    const invalidData = {
      ...mockBottleData,
      nose_description: ['Invalid#Variety'],
    };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain(
      'Les descriptions de nez ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    );
  });

  it('Devrait retourner une erreur si la région est undefined', async () => {
    const invalidData = { ...mockBottleData, region: undefined };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain(
      'La région est requise.',
    );
  });

  it("Devrait retourner une erreur généralisée si ce n'est pas un cas couvert par le code", async () => {
    prismaMock.bottles.create.mockRejectedValue(new Error('Database error'));

    const response = await createBottle(mockBottleData);

    expect(response.errors).toContain(
      'Une erreur inattendue est survenue. Veuillez réessayer.',
    );
  });

  it("Devrait retourner une erreur en disant que la date d'entrée est requise", async () => {
    const invalidData = { ...mockBottleData, entry_date: undefined };

    const response = await createBottle(invalidData);

    expect(response.errors).toContain("La date d'entrée est requise.");
  });
});
