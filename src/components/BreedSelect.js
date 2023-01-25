import { useState, useEffect } from 'react';
import Select from 'react-select';
import { ErrorMessage } from './ErrorMessage';
import { fetchBreeds } from '../dogApi';

export const BreedSelect = ({ onSelect }) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDogBreeds() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBreeds();
        setBreeds(data);
      } catch (error) {
        setError(
          'Что-то пошло не так, перезагрузите страницу, вдруг поможет 🥹'
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchDogBreeds();
  }, []);

  const options = breeds.map(breed => ({
    label: breed.name,
    value: breed.id,
  }));

  return (
    <div>
      <Select
        options={options}
        isLoading={isLoading}
        onChange={option => onSelect(option.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
