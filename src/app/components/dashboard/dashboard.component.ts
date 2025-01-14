// dashboard.component.ts
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { WeatherComponent } from '../weather/weather.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseChartComponent } from '../course-chart/course-chart.component';

interface CardContent {
  title: string;
  content: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    WeatherComponent,
    CommonModule,
    FormsModule,
    CourseChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any = {};
  userId: number = 0;
  selectedItem: number = 1;
  totalItems = 6;
  autoSlideInterval: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getItem('userId');
      if (userId) {
        this.fetchUserProfile(userId);
      } else {
        console.error("User ID not found in storage.");
      }
      this.startAutoSlide(); // Start auto-sliding
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide(); // Clean up the interval on component destruction
  }

  fetchUserProfile(userId: number) {
    this.userService.getUserProfile(userId).subscribe(
      (data) => {
        this.user = data;
        console.log('User data fetched:', this.user);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onSelectionChange(value: number) {
    this.selectedItem = value;
    this.toggleBodyClass();
    this.resetAutoSlide(); // Reset the auto-slide timer when user interacts
  }

  toggleBodyClass() {
    const body = document.body;
    if (this.selectedItem % 2 === 0) {
      this.renderer.addClass(body, 'blue');
    } else {
      this.renderer.removeClass(body, 'blue');
    }
  }

  nextSlide() {
    this.selectedItem = this.selectedItem === this.totalItems ? 1 : this.selectedItem + 1;
    this.onSelectionChange(this.selectedItem);
  }

  previousSlide() {
    this.selectedItem = this.selectedItem === 1 ? this.totalItems : this.selectedItem - 1;
    this.onSelectionChange(this.selectedItem);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  cardData: CardContent[] = [
    {
      title: 'Harita Durumu',
      content: 'Harita Ekranı, farklı bölgelerdeki eğitim zorluklarının görsel bir temsilini sunar. Kullanıcılar, şehirlerin o bölgelerdeki en zorlayıcı derslere göre renklendirildiği bir harita ile etkileşime girebilirler.'
    },
    {
      title: 'Analiz Sistemi',
      content: 'Analiz Ekranı, öğrenci performansını değerlendirmek ve geliştirmek için kapsamlı araçlar sunar. Kullanıcılar yanlış cevapladıkları soruları yükleyebilir ve zorluk seviyesine göre alıştırma soruları seçebilirler.'
    },
    {
      title: 'Akıllı Çalışma Ortamı',
      content: 'Akıllı Çalışma Ortamında, kullanıcılar doküman özetleme ve soru cevaplama için yapay zeka destekli bir arayüz ile etkileşime girerler. Bu dinamik ortam, çalışma deneyimini zenginleştirir.'
    },
    {
      title: 'MEB Kontrol Ortamı',
      content: 'Bu bileşen, öğrencilerin resmi MEB kitaplarına ve ilgili eğitim içeriklerine, detaylı açıklamalar için sohbet robotu arayüzü üzerinden erişmelerini sağlar.'
    },
    {
      title: 'Görevlerim',
      content: 'Görevlerim Ekranı, kullanıcılara akademik görev ve ödevlerini durum kategorilendirmesi ve sürükle-bırak işlevselliği ile yönetmeleri için merkezi bir platform sunar.'
    },
    {
      title: 'Yükleme Geçmişim',
      content: 'Yükleme Geçmişim, akademik yolculuğunuzun kapsamlı bir görünümünü sunar, ilerlemenizi ve başarılarınızı takip ederken sorumluluklarınızı düzenlemenize yardımcı olur.'
    }
  ];

  getCardTitle(index: number): string {
    return this.cardData[index - 1].title;
  }

  getCardContent(index: number): string {
    return this.cardData[index - 1].content;
  }
}
