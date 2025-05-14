import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Edit() {
  const { offer } = usePage().props;
  const { data, setData, put, errors } = useForm({
    titre: offer.titre || '',
    description: offer.description || '',
    poste: offer.poste || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('offers.update', offer.id));
  };

  return (
    <div>
      <h1>Éditer l'offre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            value={data.titre}
            onChange={e => setData('titre', e.target.value)}
          />
          {errors.titre && <div>{errors.titre}</div>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
          />
          {errors.description && <div>{errors.description}</div>}
        </div>
        <div>
          <label>Poste</label>
          <input
            value={data.poste}
            onChange={e => setData('poste', e.target.value)}
          />
          {errors.poste && <div>{errors.poste}</div>}
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
