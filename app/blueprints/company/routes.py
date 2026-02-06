from flask import render_template
from app.blueprints.company import bp


@bp.route('/')
def company():
    """COMPANY 허브: 카드 그리드로 기업이념/연혁/수상/CI 진입"""
    return render_template('pages/company.html')


@bp.route('/ideology')
def ideology():
    """기업이념: MISSION / VISION / CORE VALUES"""
    return render_template('pages/company_ideology.html')


@bp.route('/history')
def history():
    """연혁"""
    return render_template('pages/company_history.html')


@bp.route('/awards')
def awards():
    """수상내역"""
    return render_template('pages/company_awards.html')


@bp.route('/ci')
def ci():
    """CI소개"""
    return render_template('pages/company_ci.html')
