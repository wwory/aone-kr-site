# AONE Flask Website

AONE 기업 홈페이지 Flask 프로젝트입니다.

## 기술 스택

- **Backend**: Python Flask
- **Routing**: Flask Blueprint 패턴
- **Templating**: Jinja2 (SSR)
- **Frontend**: Bootstrap 5, jQuery
- **Deployment**: Docker, NGINX

## 프로젝트 구조

```
aone_flask/
  app/
    __init__.py
    config.py
    blueprints/
      main/
      company/
      brand/
      csr/
      contact/
      pr/
      recruit/
    templates/
      base.html
      partials/
      pages/
    static/
      css/
      js/
      img/
  run.py
  requirements.txt
  Dockerfile
  docker-compose.yml
```

## 로컬 실행 방법

### 1. 가상환경 설정 및 의존성 설치

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. 애플리케이션 실행

```bash
python run.py
```

브라우저에서 `http://localhost:5000` 접속

## Docker 실행 방법

### 1. Docker 이미지 빌드 및 실행

```bash
docker-compose up --build
```

### 2. 백그라운드 실행

```bash
docker-compose up -d
```

### 3. 로그 확인

```bash
docker-compose logs -f
```

### 4. 중지

```bash
docker-compose down
```

## 라우팅

- `/` - 메인 페이지 (Hero, COMPANY, BRAND, CSR, CONTACT 섹션)
- `/company` - 회사 소개
- `/brand` - 브랜드
- `/csr` - CSR
- `/contact` - Contact
- `/pr` - PR
- `/recruit` - Recruit

## 주요 기능

- 반응형 디자인 (Bootstrap 5)
- 스크롤 시 헤더 반투명 효과
- 부드러운 스크롤 애니메이션
- 브랜드 카드 hover 효과
- SHOP 드롭다운 메뉴

## 개발 환경

- Python 3.11+
- Flask 3.0.0
- Docker & Docker Compose
