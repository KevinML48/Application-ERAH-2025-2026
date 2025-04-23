import { useForm, Link } from '@inertiajs/react';

export default function Edit({ lecture, user }) {
  const { data, setData, put, processing, errors } = useForm({
    title: lecture.title || '',
    media_url: lecture.media_url && lecture.media_url.startsWith('http') ? lecture.media_url : '',
    description: lecture.description || '',
    published_at: lecture.published_at ? lecture.published_at.substring(0, 10) : '',
    image: null, // Pour nouvel upload
  });

  function submit(e) {
    e.preventDefault();
    put(route('lectures.update', lecture.id), {
      forceFormData: true,
    });
  }

  // Affichage du média actuel
  const isExternal = lecture.media_url && lecture.media_url.startsWith('http');
  const isImage = lecture.media_url && /\.(jpg|jpeg|png|gif|webp)$/i.test(lecture.media_url);
  const isVideo = lecture.media_url && (lecture.media_url.includes('youtube') || lecture.media_url.endsWith('.mp4'));

  return (
    <div style={{ maxWidth: 600, margin: "2em auto" }}>
      <Link href={route('lectures.index')} style={{ display: "inline-block", marginBottom: 20 }}>
        ← Retour à la liste
      </Link>
      <h2>Modifier la lecture</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Titre
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </label>

        <label>
          URL vidéo (YouTube, mp4...) OU image externe
          <input
            type="text"
            value={data.media_url}
            onChange={e => setData('media_url', e.target.value)}
            className={errors.media_url ? "input-error" : ""}
            placeholder="Laisse vide pour garder ou remplacer par un upload"
          />
          {errors.media_url && <div className="error">{errors.media_url}</div>}
        </label>

        <label>
          Image (upload)
          <input
            type="file"
            accept="image/*"
            onChange={e => setData('image', e.target.files[0])}
          />
          {errors.image && <div className="error">{errors.image}</div>}
        </label>

        {/* Affichage du média actuel */}
        {lecture.media_url && (
          <div>
            {!isExternal && (
              <img src={`/storage/${lecture.media_url}`} alt="Image actuelle" style={{ maxWidth: '200px', margin: '1em 0', borderRadius: 8 }} />
            )}
            {isExternal && isImage && (
              <img src={lecture.media_url} alt="Image actuelle" style={{ maxWidth: '200px', margin: '1em 0', borderRadius: 8 }} />
            )}
            {isExternal && isVideo && (
              lecture.media_url.includes('youtube') ? (
                <iframe
                  width="300"
                  height="170"
                  src={lecture.media_url.replace("watch?v=", "embed/")}
                  frameBorder="0"
                  allowFullScreen
                  title="Vidéo"
                  style={{ margin: '1em 0', borderRadius: 8 }}
                />
              ) : (
                <video controls width="300" src={lecture.media_url} style={{ margin: '1em 0', borderRadius: 8 }} />
              )
            )}
          </div>
        )}

        <label>
          Description
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className={errors.description ? "input-error" : ""}
            rows={5}
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </label>

        <label>
          Date de publication
          <input
            type="date"
            value={data.published_at}
            onChange={e => setData('published_at', e.target.value)}
            className={errors.published_at ? "input-error" : ""}
          />
          {errors.published_at && <div className="error">{errors.published_at}</div>}
        </label>

        <div>
          <strong>Auteur :</strong> {lecture.user?.name || user?.name || 'N/A'}
        </div>

        <button type="submit" disabled={processing} style={{ marginTop: 20 }}>
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
