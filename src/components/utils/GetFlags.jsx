import clubFlags from "../../helpers/EPLFlags.json";
import CarabaoClubFlags from "../../helpers/EFLFlags.json";
import EPLFlags from "../../helpers/EPLFlags.json";
import CountryFlags from "../../mocks/CountryFlags.json";


const GetFlags = () => {
  const HomeTeamFlag = (fixture) => {
    if (fixture.marketplaceSlug === "English-Football-League397") {
      return clubFlags.map((club, i) => {
        if (club.name === fixture.HomeTeam) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "Carabao-Cup237") {
      return CarabaoClubFlags.map((club, i) => {
        if (club.name === fixture.HomeTeam) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "premiere-league") {
      return EPLFlags.map((club, i) => {
        if (
          club.name.replace(" ", "").toLowerCase().trim() ===
          String(fixture.HomeTeam).replace(" ", "").toLowerCase().trim()
        ) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "fifa-worldcup") {
      return CountryFlags.map((country, i) => {
        return (
          (country.name === fixture.HomeTeam ||
            (country.name === "United States" && fixture.AwayTeam === "USA") ||
            (country.name === "South Korea" &&
              fixture.AwayTeam === "Korea Republic")) && (
            <img
              src={country?.image}
              alt={country.name}
              key={i}
              loading="lazy"
              className="Away__Image"
            />
          )
        );
      });
    }
  };

  const AwayTeamFlag = (fixture) => {
    if (fixture.marketplaceSlug === "English-Football-League397") {
      return clubFlags.map((club, i) => {
        if (club.name === fixture.AwayTeam) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "Carabao-Cup237") {
      return CarabaoClubFlags.map((club, i) => {
        if (club.name === fixture.AwayTeam) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "premiere-league") {
      return EPLFlags.map((club, i) => {
        if (
          club.name.replace(" ", "").toLowerCase().trim() ===
          String(fixture.AwayTeam).replace(" ", "").toLowerCase().trim()
        ) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (fixture.marketplaceSlug === "fifa-worldcup") {
      return CountryFlags.map((country, i) => {
        return (
          (country.name === fixture.AwayTeam ||
            (country.name === "United States" && fixture.AwayTeam === "USA") ||
            (country.name === "South Korea" &&
              fixture.AwayTeam === "Korea Republic")) && (
            <img
              src={country?.image}
              alt={country.name}
              key={i}
              loading="lazy"
              className="Away__Image"
            />
          )
        );
      });
    }
  };
  return { HomeTeamFlag, AwayTeamFlag };
};

export default GetFlags;
