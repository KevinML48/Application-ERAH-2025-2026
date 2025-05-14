import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function Create() {
  const { data, setData, post, errors } = useForm({
    titre: '',
    description: '',
    poste: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('offers.store'));
  };

  return (
    <div>
      <h1>Nouvelle offre</h1>
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
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
