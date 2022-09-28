import React from "react";
import Profile from "./Profile.js";
import Card from "./Card.js";
import Footer from "./Footer.js";


function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  isLoading
}) {

  return (
    <>
    <main>
      <Profile
        onEditProfile={onEditProfile}
        onEditAvatar={onEditAvatar}
        onAddPlace={onAddPlace}
        isLoading={isLoading}
      />

      <section className="cards">
        {cards.map((cardData, i) => (
          <Card
            key={cardData._id}
            card={cardData}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Main;
