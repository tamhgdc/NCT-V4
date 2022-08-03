import React from 'react';

import huawei from "../../assets/images/huawei.png";
import google from "../../assets/images/google.png";
import appstore from "../../assets/images/appstore.png";
import logoNCT from "../../assets/images/logo-nctc.svg";
import cong_thuong from "../../assets/images/Cong_Thuong.svg";
import DMCA from "../../assets/images/DMCA.svg";

import { Link } from "react-router-dom"

const Footer = () => {
    return <div className="footer">
        <div className="footer__top">
            <div className="footer__top__left">
                <ul className="footer__top__left__menu">
                    <li><a href="/">Giới thiệu</a></li>
                    <li><a href="/">Sản phẩm - Dịch vụ</a></li>
                    <li><a href="/">Hỗ trợ</a></li>
                    <li><a href="/">Thỏa thuận sử dụng</a></li>
                </ul>
            </div>
            <div className="footer__top__right">
                <div className="footer__top__right__social">
                    <Link to="/"><i className='bx bxl-facebook-square face'></i></Link>
                    <Link to="/"><i className='bx bxl-instagram insta' ></i></Link>
                </div>
                <div className="footer__top__right__download">
                    <Link to="/"><img src={appstore} alt="" /></Link>
                    <Link to="/"><img src={google} alt="" /></Link>
                    <Link to="/"><img src={huawei} alt="" /></Link>
                </div>
            </div>
        </div>
        <div className="footer__mid">
            <div className="footer__mid__author">
                <div className="footer__mid__author__img">
                    <img src={logoNCT} alt="" />
                </div>
                <div className="footer__mid__author__info">
                    <h3>CÔNG TY CỔ PHẦN N C T</h3>
                    <p>Chủ sở hữu website: <span>Ông Nhan Thế Luân</span></p>
                </div>
            </div>
            <div className="footer__mid__confirm">
                <img src={cong_thuong} alt="" />
                <img src={DMCA} alt="" />
            </div>
        </div>
        <div className="footer__down">
            <p>Giấy phép MXH số 499/GP-BTTTT do Bộ Thông Tin và Truyền thông cấp ngày 28/09/2015.</p>
            <p>Giấy Chứng nhận Đăng ký Kinh doanh số 0305535715 do Sở kế hoạch và Đầu tư Tp.Hồ Chí Minh cấp ngày 01/03/2008.</p>
            <div className="footer__down__contact">
                <h3 className="footer__down__contact__title">Liên hệ chúng tôi</h3>
                <p className="footer__down__contact__address">
                    <i className='bx bxs-location-plus'></i> Tòa nhà The 678 Tower, 67 Hoàng Văn Thái, P.Tân Phú, Q.7, TP.HCM.
                </p>
                <p className="footer__down__contact__phone">
                    <i className='bx bxs-phone-call' ></i> (028) 38687979
                </p>
            </div>
        </div>
    </div>;
};

export default Footer;
