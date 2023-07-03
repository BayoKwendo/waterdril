import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';

const Sale = `${process.env.PUBLIC_URL}/img/for_store/catalog/sale_lable.png`;
const New = `${process.env.PUBLIC_URL}/img/for_store/catalog/new_lable.png`;

const Catalog = ({ items }) => (
  <div className="catalog-items__wrap">
    <div className="catalog-items">
      {items.map(item => (
        <CardBody className="catalog-item" key={item.i}>
          <a className="catalog-item__link" href={item.src}>
            {item.new ? <img className="catalog-item__label" src={New} alt="new" /> : ''}
            {item.sale ? <img className="catalog-item__label" src={Sale} alt="sale" /> : ''}
            <div className="catalog-item__img-wrap">
              <img className="catalog-item__img" src={item.src} alt="catalog-item-img" />
            </div>
            <div className="catalog-item__info">
              <h4 className="catalog-item__title">{item.title}</h4>
              <p className="catalog-item__description">{item.id_no}</p>
              <p className="catalog-item__description">{item.msisdn}</p>
              <p className="catalog-item__description">{item.description}</p>

              <p className="catalog-item__description">{item.village}</p>
              <p className="catalog-item__description">{item.designation}</p>

              <h1 className="catalog-item__price">{item.price}</h1>
              {item.sale ? <p className="catalog-item__old-price">{item.oldPrice}</p> : ''}
              {item.colors.map(color => (
                <span
                  key={color.i}
                  className="catalog-item__color"
                  style={{ background: color }}
                />
              ))}
            </div>
          </a>
        </CardBody>
      ))}
    </div>
  </div>
);

Catalog.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    new: PropTypes.bool,
  })),
};

Catalog.defaultProps = {
  items: [],
};

export default Catalog;
