export const CountryService = {
  getCountries: () => {
    return Promise.resolve([
      {
        code: 'BR',
        flag: '🇧🇷',
        name: 'Brazil',
        population: 211000000,
        area: 8515767,
        region: 'Americas',
      },
      {
        code: 'FR',
        flag: '🇫🇷',
        name: 'France',
        population: 67000000,
        area: 643801,
        region: 'Europe',
      },
      {
        code: 'JP',
        flag: '🇯🇵',
        name: 'Japan',
        population: 126000000,
        area: 377975,
        region: 'Asia',
      },
      {
        code: 'NG',
        flag: '🇳🇬',
        name: 'Nigeria',
        population: 206000000,
        area: 923768,
        region: 'Africa',
      },
      {
        code: 'AU',
        flag: '🇦🇺',
        name: 'Australia',
        population: 25600000,
        area: 7692024,
        region: 'Oceania',
      },
    ]);
  }
};
