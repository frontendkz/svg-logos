fetch("logos.json")
  .then((response) => response.json())
  .then((data) => {
    createApp(data);
  });

function createApp(data) {
  const app = Vue.createApp({
    el: "#app",
    data() {
      return {
        search: "",
        category: "all",
        logos: mapLogos(data),
      };
    },
    methods: {
      onCategoryChange(event) {
        console.log(event.target.value);
      },
    },
    computed: {
      categories() {
        const categories = this.logos.map((logo) => {
          return logo.category;
        });
        return ["all", ...new Set(categories)];
      },
      filteredList() {
        const filteredByCategory =
          this.category === "all"
            ? this.logos
            : this.logos.filter((logo) => {
                return logo.category === this.category;
              });

        if (!this.search) {
          return filteredByCategory;
        }
        return filteredByCategory.filter((logo) => {
          return (
            logo.name.toLowerCase().includes(this.search.toLowerCase()) ||
            logo.category.toLowerCase().includes(this.search.toLowerCase())
          );
        });
      },
    },
  });
  app.mount("#app");
}

const mapLogos = (logos) => {
  return logos.map((logo) => {
    return {
      name: capitalize(logo.name.replace(/_/g, " ").replace(".svg", "")),
      src: `catalog/${logo.category}/${logo.name}`,
      category: `${logo.category}`,
    };
  });
};

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
