import { createUser } from './user.create';

describe('createUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Devrait retourner une erreur si les mots de passes ne correspondent pas', async () => {
    const invalidData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'Azertyuiop12,',
      confirmPassword: 'Azertyuiop12,,',
      phone: '1234567890',
      status: 'particulier',
    };
  
    const response = await createUser(invalidData);
  
    expect(response.message).toBe('Les mots de passe ne correspondent pas.');
  });

  it('Devrait retourner une erreur si la validation échoue', async () => {
    const invalidData = {
      firstname: 'John',
      lastname: '',
      email: '',
      password: 'Valid1Password@',
      confirmPassword: 'Valid1Password@',
      phone: '1234567890',
      status: 'particulier',
    };

    const response = await createUser(invalidData);

    expect(response.message).toBe(
      'Il y a un problème avec les champs du formulaire. Veuillez vérifier.',
    );
    expect(response.errors).toBeDefined();
  });
});
