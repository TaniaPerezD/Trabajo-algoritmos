import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
import SingleCategoryTwo from '../../components/Category/SingleCategoryTwo';

import titleImg from '../../assets/img/category/title.svg';
import iconImg1 from '../../assets/img/category/category-4-1.png';
import iconImg2 from '../../assets/img/category/category-4-2.png';
import iconImg3 from '../../assets/img/category/category-4-3.png';
import iconImg4 from '../../assets/img/category/category-4-4.png';

const Category = () => {
  return (
    <div className="it-category-4-area p-relative pt-120 pb-90 grey-bg">
      <div className="container">
        <div className="it-category-4-title-wrap mb-60">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <SectionTitle
                itemClass="it-category-4-title-box"
                subTitleClass="it-section-subtitle-5 purple-2"
                subTitle="ORDENAMIENTOS"
                titleClass="it-section-title-3"
                title="SORTS"
                titleImage={titleImg}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="it-category-4-btn-box text-start text-md-end pt-25">
                <Link className="ed-btn-square purple-2" to="/sort">
                  VER MÁS ACERCA DE SORTS
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
          <div
            className="col mb-30 wow animate__fadeInUp grey-bg"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <SingleCategoryTwo
              iconImage={iconImg1}
              title="SELECTION SORT"
              subTitle="SORT"
            />
          </div>
          <div
            className="col mb-30 wow animate__fadeInUp grey-bg"
            data-wow-duration=".9s"
            data-wow-delay=".4s"
          >
            <SingleCategoryTwo
              iconImage={iconImg2}
              title="INSERTION SORT"
              subTitle="SORT"
            />
          </div>
          <div
            className="col mb-30 wow animate__fadeInUp grey-bg"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <SingleCategoryTwo
              iconImage={iconImg3}
              title="SHELLSORT"
              subTitle="SORT"
            />
          </div>
          <div
            className="col mb-30 wow animate__fadeInUp grey-bg"
            data-wow-duration=".9s"
            data-wow-delay=".6s"
          >
            <SingleCategoryTwo
              iconImage={iconImg4}
              title="MERGESORT"
              subTitle="SORT"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
