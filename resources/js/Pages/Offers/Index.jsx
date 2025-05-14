import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
  const { offers } = usePage().props;

  const handleDelete = (id) => {
    if (confirm('Supprimer cette offre ?')) {
      Inertia.delete(route('offers.destroy', id));
    }
  };

  return (
    <div>
      <h1>Liste des offres</h1>
      <Link href={route('offers.create')}>Nouvelle offre</Link>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Poste</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.titre}</td>
              <td>{offer.poste}</td>
              <td>{new Date(offer.created_at).toLocaleDateString()}</td>
              <td>
                <Link href={route('offers.edit', offer.id)}>Éditer</Link>
                <button onClick={() => handleDelete(offer.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
