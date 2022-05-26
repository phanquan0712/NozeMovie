const apiConfig = {
   baseUrl: 'https://api.themoviedb.org/3/',
   apiKey: '8259ce507dbc43d7f6de71ec8d3b28bf',
   originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
   w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
