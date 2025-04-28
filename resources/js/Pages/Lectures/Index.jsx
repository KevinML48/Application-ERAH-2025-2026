import React, { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import '../../../css/lecture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Index({ lectures }) {
  const [visibleCount, setVisibleCount] = useState(5);

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
    if (confirm('Supprimer ?')) {
      router.delete(route('lectures.destroy', id), {
        preserveScroll: true,
      });
    }
  }

  function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  function renderMedia(lecture) {
    const url = lecture.media_url;
    if (!url) return null;

    const isExternal = url.startsWith('http');
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    const isMp4 = url.endsWith('.mp4');
    const youtubeId = getYouTubeId(url);

    if (!isExternal) {
      return <img src={`/storage/${url}`} alt={lecture.title} className="img-cover" />;
    }
    if (isImage) {
      return <img src={url} alt={lecture.title} className="img-cover" />;
    }
    if (youtubeId) {
      return (
        <div className="media-responsive">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={lecture.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="media-iframe"
          />
        </div>
      );
    }
    if (isMp4) {
      return (
        <video controls width={300}>
          <source src={url} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      );
    }
    return null;
  }

  return (
    <div>
      <h1>Lectures</h1>
      {/* Formulaire d'ajout */}
      <form onSubmit={submit}>
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
        {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
      </form>

      {/* Section Featured */}
      <section className="section feature" aria-label="feature" id="featured">
        <div className="container">
          <h2 className="headline headline-2 section-title">
            <span className="span">Editor's picked</span>
          </h2>
          <p className="section-text">
            Featured and highly rated articles
          </p>
          <ul className="feature-list">
            {lectures.slice(0, visibleCount).map(lecture => (
              <li key={lecture.id}>
                <div className="card feature-card">
                  <figure className="card-banner img-holder" style={{ "--width": 1602, "--height": 903 }}>
                    {renderMedia(lecture) ||
                      <img
                        src="./assets/images/featured-1.png"
                        width="1602"
                        height="903"
                        loading="lazy"
                        alt={lecture.title}
                        className="img-cover"
                      />
                    }
                  </figure>
                  <div className="card-content">
                    <div className="card-wrapper">
                      <div className="wrapper">
                        <ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>
                        <span className="span">
                          {lecture.published_at
                            ? `Publié le ${new Date(lecture.published_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}`
                            : "Date inconnue"}
                        </span>
                      </div>
                    </div>
                    <h3 className="headline headline-3">
                      <Link href={route('lectures.show', lecture.id)} className="card-title hover-2">
                        {lecture.title}
                      </Link>
                    </h3>
                    <div className="card-wrapper">
                      <div className="profile-card">
                        <div>
                          <p className="card-title">{lecture.user?.name || "Inconnu"}</p>
                          <p className="card-subtitle">
                            {lecture.published_at ? new Date(lecture.published_at).toLocaleDateString('fr-FR') : ''}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={route('lectures.show', lecture.id)}
                        className="card-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                      >
                        Lecture
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {visibleCount < lectures.length && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setVisibleCount(visibleCount + 5)}
            >
              <span className="span">Découvrir</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
