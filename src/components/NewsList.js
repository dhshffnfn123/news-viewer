import React, { useEffect, useState } from "react"; 
// useEffect를 사용하여 처음 렌더링 될 때, 그리고 category값이 바뀔 때 요청하도록 설정하였다.
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'http://google.com',
    urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=b5aee5a2926440d0a34450fa1ba10ae4`,
        );
    }, [category]);

    // 대기 중
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    // 에러가 발생했을 때
    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }

    // response 값이 유효할 때
    const { articles } = response.data;
    return ( 
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;