import React, { useEffect, useState } from "react";
import TestimonialItem from "../components/TestimonialItem.jsx";

const Testimonials = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("/offers-json") // ou '/api/offers' si tu utilises api.php
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);

  const halfLength = Math.floor(offers.length / 2);

  return (
    <section className="relative z-2 py-24 md:py-28 lg:py-40">
      <div className="container block lg:flex">
        <div className="testimonials_head-res relative z-2 mr-20 flex-300">
<p className="caption mb-5 max-md:mb-2.5">Nos opportunités</p>
<h3 className="h3 max-md:h5 text-p4">Les offres qui vous attendent</h3>
        </div>

        <div className="testimonials_inner-after testimonials_inner-before relative -my-12 -mr-3 flex items-start max-lg:static max-md:block">
          <div className="testimonials_group-after flex-50">
            {offers.slice(0, halfLength).map((offer) => (
              <TestimonialItem
                key={offer.id}
                item={{
                  name: offer.titre,
                  role: offer.poste,
                  avatarUrl: "/build/assets/images-welcome/logo_erah_sans_texte.png", // ou une image par défaut
                  comment: offer.description,
                }}
                containerClassName="last:after:hidden last:after:max-md:block"
              />
            ))}
          </div>

          <div className="flex-50">
            {offers.slice(halfLength).map((offer) => (
              <TestimonialItem
                key={offer.id}
                item={{
                  name: offer.titre,
                  role: offer.poste,
                  avatarUrl: "/build/assets/images-welcome/logo_erah_sans_texte.png",
                  comment: offer.description,
                }}
                containerClassName="last:after:hidden after:right-auto after:left-0 after:max-md:-left-4 md:px-12"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
