import React from 'react';
import { Link } from '@inertiajs/react';

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function Show({ lecture }) {
  const url = lecture.media_url;
  const isExternal = url?.startsWith('http');
  const isImage = url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isMp4 = url && url.endsWith('.mp4');
  const youtubeId = getYouTubeId(url);

  let media;
  if (youtubeId) {
    media = (
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 ratio
        height: 0,
        margin: '32px 0',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={lecture.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            borderRadius: 12,
          }}
        />
      </div>
    );
  } else if (isMp4) {
    media = (
      <video
        controls
        style={{
          width: '100%',
          borderRadius: 12,
          margin: '32px 0',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          backgroundColor: '#000',
        }}
      >
        <source src={isExternal ? url : '/storage/' + url} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
    );
  } else if (isImage) {
    media = (
      <img
        src={isExternal ? url : '/storage/' + url}
        alt={lecture.title}
        style={{
          width: '100%',
          borderRadius: 12,
          margin: '32px 0',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          objectFit: 'cover',
          backgroundColor: '#f8f8f8',
        }}
      />
    );
  } else {
    media = null;
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: 16,
      boxShadow: '0 10px 36px rgba(0,0,0,0.12)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      lineHeight: 1.6,
      boxSizing: 'border-box',
    }}>
      <Link
        href={route('lectures.index')}
        style={{
          display: 'inline-block',
          fontSize: 16,
          marginBottom: 24,
          textDecoration: 'none',
          color: '#0066cc',
          fontWeight: 600,
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#004a99'}
        onMouseLeave={e => e.currentTarget.style.color = '#0066cc'}
      >
        ← Retour à la liste
      </Link>

      <h1 style={{
        fontSize: 'clamp(24px, 5vw, 36px)', // 🔥 Adaptatif pour mobile
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#111',
      }}>
        {lecture.title}
      </h1>

      {media}

      <div style={{
        fontSize: 'clamp(16px, 4vw, 20px)', // 🔥 Adaptatif pour mobile
        color: '#374151',
        marginBottom: 36,
        lineHeight: 1.8,
        whiteSpace: 'pre-line',  // 🔥 Respecte \n dans la description
        wordBreak: 'break-word', // 🔥 Coupe proprement les mots
      }}>
        {lecture.description}
      </div>

      <div style={{
        color: '#666',
        fontSize: 'clamp(12px, 2.5vw, 14px)', // 🔥 Adaptatif pour mobile
        borderTop: '1px solid #eee',
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'column', // 🔥 En colonne pour petits écrans
        gap: 8,
        alignItems: 'flex-start',
      }}>
        <span>
          Publié le&nbsp;
          {lecture.published_at
            ? new Date(lecture.published_at).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Date non précisée'
          }
        </span>
        {lecture.user && (
          <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
            Par {lecture.user.name}
          </span>
        )}
      </div>
    </div>
  );
}
