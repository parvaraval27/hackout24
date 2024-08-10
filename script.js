document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const apiKey = '92cbb6df61ab44e9a040fb3c8e26d458';
    
    // API endpoint for space news
    const apiUrl = `https://gnews.io/api/v4/top-headlines?category=science&lang=en&apikey=${apiKey}`;

    const fetchNews = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.articles) {
                newsContainer.innerHTML = '';

                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    
                    newsItem.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                    
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>No news found. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        }
    };

    fetchNews();

    // Refresh news every 10 minutes
    setInterval(fetchNews, 10 * 60 * 1000); // 10 minutes
});
