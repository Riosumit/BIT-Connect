'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/navbar/page';
import TitleComponent from '@/components/post-components/title_component/page';
import TextComponent from '@/components/post-components/text-component/page';
import ImageComponent from '@/components/post-components/image-component/page';
import TextWithImageComponent from '@/components/post-components/textwithimage-component/page';

const ArticleView = ({ components }) => {
    return (
      <div className="bg-white min-h-screen min-w-screen p-4">
        <div className="flex flex-col overflow-y-scroll">
          {components.map(({ id, type, data }) => (
            <div key={id}>
              {type === 'TitleComponent' && <TitleComponent data={data} />}
              {type === 'TextComponent' && <TextComponent data={data} />}
              {type === 'ImageComponent' && <ImageComponent data={data} />}
              {type === 'TextWithImageComponent' && <TextWithImageComponent data={data} />}
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default ArticleView;
