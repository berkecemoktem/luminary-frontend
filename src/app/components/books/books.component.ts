import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface Subject {
  id: string;
  name: string;
  icon: string;
  books: Book[];
}

interface Book {
  title: string;
  image: string;
  link: string;
  description: string;
  topics: string[];
  grade: number;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BooksComponent implements OnInit{
  subjects: Subject[] = [
    {
      id: 'biology',
      name: 'Biyoloji',
      icon: '🧬',
      books: [
        {
          title: '9. Sınıf Biyoloji',
          image: '9th.png',
          link: '/lab-page/biology/9',
          description: '9.sınıf öğrencileri için temel biyoloji kavramları',
          topics: ['Hücre Biyolojisi', 'Temel Genetik', 'İnsan Sistemleri'],
          grade: 9
        },
        {
          title: '10. Sınıf Biyoloji',
          image: '10th.jpg',
          link: '/lab-page/biology/10',
          description: '10. sınıf için gelişmiş biyoloji kavramları',
          topics: ['Evrim', 'Ekoloji', 'Moleküler Biyoloji'],
          grade: 10
        },
        {
          title: '11. Sınıf Biyoloji',
          image: '11th.jpg',
          link: '/lab-page/biology/11',
          description: 'Karmaşık biyolojik sistemler ve araştırma yöntemleri',
          topics: ['Biyoteknoloji', 'Sinirbilimi', 'İmmünoloji'],
          grade: 11
        },
        {
          title: '12. Sınıf Biyoloji',
          image: '12th.jpg',
          link: '/lab-page/biology/12',
          description: 'Gelişmiş araştırma ve uzmanlık konuları',
          topics: ['Genetik Mühendisliği', 'Kanser Biyolojisi', 'Sistem Biyolojisi'],
          grade: 12
        }
      ]
    },
    {
      id: 'physics',
      name: 'Fizik',
      icon: '⚛️',
      books: [
        {
          title: '9. Sınıf Fizik',
          image: 'Phy9th.png',
          link: '/lab-page/physics/9',
          description: 'Temel fizik kavramlarına giriş',
          topics: ['Mekanik', 'Enerji', 'Dalgalar'],
          grade: 9
        },
        {
          title: '10. Sınıf Fizik',
          image: 'Phy10th.png',
          link: '/lab-page/physics/10',
          description: 'Gelişmiş fizik prensipleri ve uygulamaları',
          topics: ['Termodinamik', 'Elektrik', 'Manyetizma'],
          grade: 10
        },
        {
          title: '11. Sınıf Fizik',
          image: 'Phy11th.png',
          link: '/lab-page/physics/11',
          description: 'Modern fizik ve kuantum mekaniği',
          topics: ['Kuantum Fiziği', 'Nükleer Fizik', 'Görelilik'],
          grade: 11
        },
        {
          title: '12. Sınıf Fizik',
          image: 'Phy12th.png',
          link: '/lab-page/physics/12',
          description: 'Gelişmiş teorik fizik kavramları',
          topics: ['Parçacık Fiziği', 'Astrofizik', 'Alan Teorisi'],
          grade: 12
        }
      ]
    },
    {
      id: 'mathematics',
      name: 'Matematik',
      icon: '📐',
      books: [
        {
          title: '9. Sınıf Matematik',
          image: 'Math9th.png',
          link: '/lab-page/math/9',
          description: 'Temel matematik kavramları ve problem çözme',
          topics: ['Cebir', 'Geometri', 'Fonksiyonlar'],
          grade: 9
        },
        {
          title: '10. Sınıf Matematik',
          image: 'Math10th.png',
          link: '/lab-page/math/10',
          description: 'Gelişmiş matematik prensipleri',
          topics: ['Trigonometri', 'İstatistik', 'Kalkülüs'],
          grade: 10
        },
        {
          title: '11. Sınıf Matematik',
          image: 'Math11th.png',
          link: '/lab-page/math/11',
          description: 'Yüksek matematik ve kalkülüs',
          topics: ['Kalkülüs', 'Lineer Cebir', 'Olasılık'],
          grade: 11
        },
        {
          title: '12. Sınıf Matematik',
          image: 'Math12th.png',
          link: '/lab-page/math/12',
          description: 'Gelişmiş matematiksel analiz',
          topics: ['İleri Kalkülüs', 'Karmaşık Analiz', 'Sayılar Teorisi'],
          grade: 12
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Kimya',
      icon: '🧪',
      books: [
        {
          title: '9. Sınıf Kimya',
          image: 'Ch9th.png',
          link: '/lab-page/chemistry/9',
          description: 'Temel kimya kavramları ve laboratuvar çalışmaları',
          topics: ['Atomik Yapı', 'Kimyasal Bağlar', 'Reaksiyonlar'],
          grade: 9
        },
        {
          title: '10. Sınıf Kimya',
          image: 'Ch10th.png',
          link: '/lab-page/chemistry/10',
          description: 'Gelişmiş kimya prensipleri',
          topics: ['Organik Kimya', 'Çözeltiler', 'Denklem'],
          grade: 10
        },
        {
          title: '11. Sınıf Kimya',
          image: 'Ch11th.png',
          link: '/lab-page/chemistry/11',
          description: 'Gelişmiş organik ve fizikokimya',
          topics: ['İleri Organik', 'Termokimya', 'Kinetik'],
          grade: 11
        },
        {
          title: '12. Sınıf Kimya',
          image: 'Ch12th.png',
          link: '/lab-page/chemistry/12',
          description: 'Uzmanlık kimya konuları',
          topics: ['Biyokimya', 'Analitik Kimya', 'Araştırma Yöntemleri'],
          grade: 12
        }
      ]
    },
    {
      id: 'turkish',
      name: 'Türkçe',
      icon: '📚',
      books: [
        {
          title: '9. Sınıf Türkçe',
          image: 'Turkish9th.png',
          link: '/lab-page/turkish/9',
          description: 'Türk dili ve edebiyatı temel kavramları',
          topics: ['Gramer', 'Edebiyat', 'Yazı'],
          grade: 9
        },
        {
          title: '10. Sınıf Türkçe',
          image: 'Turkish10th.png',
          link: '/lab-page/turkish/10',
          description: 'Gelişmiş Türk dili çalışmaları',
          topics: ['Şiir', 'Roman Analizi', 'Kompozisyon'],
          grade: 10
        },
        {
          title: '11. Sınıf Türkçe',
          image: 'Turkish11th.PNG',
          link: '/lab-page/turkish/11',
          description: 'Gelişmiş edebiyat ve kompozisyon',
          topics: ['Klasik Edebiyat', 'Modern Şiir', 'Yaratıcı Yazı'],
          grade: 11
        },
        {
          title: '12. Sınıf Türkçe',
          image: 'Turkish12th.png',
          link: '/lab-page/turkish/12',
          description: 'Gelişmiş edebiyat analizi ve yazımı',
          topics: ['Edebiyat Eleştirisi', 'Araştırma Yazımı', 'Dünya Edebiyatı'],
          grade: 12
        }
      ]
    }
  ];

  selectedSubject: Subject | null = null;
  selectedBook: Book | null = null;

  constructor() {}

  ngOnInit(): void {}

  selectSubject(subject: Subject): void {
    this.selectedSubject = this.selectedSubject?.id === subject.id ? null : subject;
    this.selectedBook = null;
  }

  showBookDetails(book: Book): void {
    this.selectedBook = book;
  }

  hideBookDetails(): void {
    this.selectedBook = null;
  }

  openLabPage(link: string): void {
    window.location.href = link;
  }
}
