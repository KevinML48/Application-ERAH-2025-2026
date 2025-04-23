import { Link, useForm, router } from '@inertiajs/react';

export default function Index({ lectures }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    media_url: '',
    description: '',
    published_at: '',
    image: null,
  });

  function submit(e) {
    e.preventDefault();
    post(route('lectures.store'), {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  }

  function handleDelete(id) {
    if (confirm('Supprimer ?')) {
      router.delete(route('lectures.destroy', id), {
        preserveScroll: true,
      });
    }
  }

  function renderMedia(lecture) {
    const isExternal = lecture.media_url && lecture.media_url.startsWith('http');
    const isImage = lecture.media_url && /\.(jpg|jpeg|png|gif|webp)$/i.test(lecture.media_url);
    const isVideo = lecture.media_url && (lecture.media_url.includes('youtube') || lecture.media_url.endsWith('.mp4'));

    if (!lecture.media_url) return null;

    if (!isExternal) {
      // Image locale uploadée
      return <img src={`/storage/${lecture.media_url}`} alt={lecture.title} style={{ maxWidth: 100, borderRadius: 8, margin: "8px 0" }} />;
    }
    if (isImage) {
      return <img src={lecture.media_url} alt={lecture.title} style={{ maxWidth: 100, borderRadius: 8, margin: "8px 0" }} />;
    }
    if (isVideo) {
      return <span style={{ color: "#276EF1" }}>🎬 Vidéo</span>;
    }
    return null;
  }

  return (
    <div style={{ maxWidth: 900, margin: "2em auto" }}>
      <h1>Lectures</h1>
      {/* Formulaire d'ajout */}
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
        <input
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          placeholder="Titre"
        />
        <input
          value={data.media_url}
          onChange={e => setData('media_url', e.target.value)}
          placeholder="URL vidéo (YouTube, mp4...) OU image externe"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setData('image', e.target.files[0])}
        />
        <textarea
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={data.published_at}
          onChange={e => setData('published_at', e.target.value)}
        />
        <button type="submit" disabled={processing}>Ajouter</button>
        {Object.values(errors).map((err, i) => <div key={i} style={{ color: "red" }}>{err}</div>)}
      </form>

      {/* Liste des lectures */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {lectures.map(lecture => (
          <li key={lecture.id} style={{ marginBottom: 24, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
            <Link href={route('lectures.show', lecture.id)} style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              {lecture.title}
            </Link>
            <div style={{ color: "#888" }}>
              par {lecture.user?.name || "Inconnu"} le {lecture.published_at ? new Date(lecture.published_at).toLocaleDateString() : ''}
            </div>
            {renderMedia(lecture)}
            <div style={{ margin: "8px 0" }}>{lecture.description?.slice(0, 120)}...</div>
            <Link href={route('lectures.edit', lecture.id)} style={{ marginRight: 10 }}>✏️</Link>
            <button
              type="button"
              onClick={() => handleDelete(lecture.id)}
              style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
