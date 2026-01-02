import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type UserRole = 'guest' | 'user' | 'admin' | 'owner';

interface User {
  name: string;
  role: UserRole;
  avatar: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'Гость',
    role: 'guest',
    avatar: 'Г',
  });

  const [activeTab, setActiveTab] = useState('library');

  const roleColors: Record<UserRole, string> = {
    guest: 'bg-muted text-muted-foreground',
    user: 'bg-vivid-blue text-white',
    admin: 'bg-vivid-orange text-white',
    owner: 'gradient-purple-pink text-white',
  };

  const roleLabels: Record<UserRole, string> = {
    guest: 'Гость',
    user: 'Пользователь',
    admin: 'Администратор',
    owner: 'Владелец',
  };

  const handleLogin = (role: UserRole) => {
    const names: Record<UserRole, string> = {
      guest: 'Гость',
      user: 'Алексей',
      admin: 'Мария',
      owner: 'Вы',
    };
    setCurrentUser({
      name: names[role],
      role,
      avatar: names[role][0],
    });
  };

  const mediaItems = [
    { id: 1, type: 'video', title: 'Презентация проекта', color: 'gradient-purple-pink' },
    { id: 2, type: 'audio', title: 'Подкаст #42', color: 'gradient-orange-red' },
    { id: 3, type: 'photo', title: 'Галерея мероприятия', color: 'gradient-blue-purple' },
    { id: 4, type: 'post', title: 'Новости платформы', color: 'gradient-purple-pink' },
  ];

  const documents = [
    { id: 1, title: 'Договор на услуги', status: 'pending' },
    { id: 2, title: 'Анкета пользователя', status: 'filled' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="glass-morphism sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl gradient-purple-pink flex items-center justify-center animate-float">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-vivid-purple to-vivid-magenta bg-clip-text text-transparent">
              MediaHub
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="MessageCircle" size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-vivid-orange rounded-full text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]">
                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">Техподдержка</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-muted">
                      <p className="text-sm">Добрый день! Как я могу помочь?</p>
                      <span className="text-xs text-muted-foreground">10:24</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass-morphism animate-scale-in">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-sm">{currentUser.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <Badge className={`${roleColors[currentUser.role]} text-xs px-2 py-0 h-5`}>
                  {roleLabels[currentUser.role]}
                </Badge>
              </div>
            </div>

            {currentUser.role === 'guest' && (
              <Button
                className="gradient-purple-pink text-white rounded-2xl hover:opacity-90 transition-opacity"
                onClick={() => handleLogin('user')}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentUser.role === 'guest' && (
          <Card className="mb-8 p-8 glass-morphism border-2 border-vivid-purple/20 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Войдите, чтобы продолжить</h2>
                <p className="text-muted-foreground">
                  Авторизуйтесь через социальные сети для доступа ко всем функциям
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl"
                  onClick={() => handleLogin('user')}
                >
                  <Icon name="Chrome" size={20} className="mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl"
                  onClick={() => handleLogin('user')}
                >
                  <Icon name="Github" size={20} className="mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto glass-morphism h-14 p-1">
            <TabsTrigger
              value="library"
              className="rounded-xl data-[state=active]:gradient-purple-pink data-[state=active]:text-white"
            >
              <Icon name="Library" size={18} className="mr-2" />
              Библиотека
            </TabsTrigger>
            <TabsTrigger
              value="voice"
              className="rounded-xl data-[state=active]:gradient-orange-red data-[state=active]:text-white"
            >
              <Icon name="Mic" size={18} className="mr-2" />
              Голосовой
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-xl data-[state=active]:gradient-blue-purple data-[state=active]:text-white"
            >
              <Icon name="FileText" size={18} className="mr-2" />
              Документы
            </TabsTrigger>
            <TabsTrigger
              value="figma"
              className="rounded-xl data-[state=active]:gradient-purple-pink data-[state=active]:text-white"
              disabled={currentUser.role !== 'admin' && currentUser.role !== 'owner'}
            >
              <Icon name="Figma" size={18} className="mr-2" />
              Figma
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="rounded-xl data-[state=active]:gradient-orange-red data-[state=active]:text-white"
              disabled={currentUser.role !== 'admin' && currentUser.role !== 'owner'}
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Управление
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Медиабиблиотека</h2>
              {(currentUser.role === 'admin' || currentUser.role === 'owner') && (
                <div className="flex gap-2">
                  <Button className="gradient-purple-pink text-white rounded-2xl">
                    <Icon name="Upload" size={18} className="mr-2" />
                    Загрузить
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <Icon name="Download" size={18} className="mr-2" />
                    Сбросить с YouTube
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in border-2 hover:border-vivid-purple/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-48 ${item.color} flex items-center justify-center`}>
                    <Icon
                      name={
                        item.type === 'video'
                          ? 'Video'
                          : item.type === 'audio'
                            ? 'Music'
                            : item.type === 'photo'
                              ? 'Image'
                              : 'FileText'
                      }
                      size={48}
                      className="text-white opacity-80"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize mt-1">{item.type}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6 animate-fade-in">
            <Card className="p-12 text-center glass-morphism">
              <div className="inline-block w-32 h-32 rounded-full gradient-orange-red flex items-center justify-center mb-6 animate-float">
                <Icon name="Mic" size={64} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Голосовой чат</h2>
              <p className="text-muted-foreground mb-6">
                {currentUser.role === 'guest'
                  ? 'Войдите, чтобы присоединиться к голосовому чату'
                  : 'Нажмите кнопку, чтобы начать голосовое общение'}
              </p>
              <Button
                size="lg"
                className="gradient-orange-red text-white rounded-2xl"
                disabled={currentUser.role === 'guest'}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Присоединиться
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Документы</h2>
            </div>

            {currentUser.role === 'guest' ? (
              <Card className="p-12 text-center glass-morphism">
                <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Войдите, чтобы просматривать документы</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card
                    key={doc.id}
                    className="p-6 hover:border-vivid-purple/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-blue-purple flex items-center justify-center">
                          <Icon name="FileText" className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.status === 'pending' ? 'Требует заполнения' : 'Заполнен'}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={doc.status === 'pending' ? 'secondary' : 'default'}
                        className="rounded-xl"
                      >
                        {doc.status === 'pending' ? 'Ожидает' : 'Готово'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="figma" className="space-y-6 animate-fade-in">
            <Card className="p-12 text-center glass-morphism">
              <div className="inline-block w-32 h-32 rounded-full gradient-purple-pink flex items-center justify-center mb-6 animate-float">
                <Icon name="Figma" size={64} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Управление проектами Figma</h2>
              <p className="text-muted-foreground mb-6">
                Интеграция с Figma для управления вашими дизайн-проектами
              </p>
              <Button size="lg" className="gradient-purple-pink text-white rounded-2xl">
                <Icon name="ExternalLink" size={20} className="mr-2" />
                Открыть проекты
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:border-vivid-orange/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl gradient-orange-red flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Управление пользователями</h3>
                <p className="text-sm text-muted-foreground">Добавление и удаление аккаунтов</p>
              </Card>

              <Card className="p-6 hover:border-vivid-purple/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl gradient-purple-pink flex items-center justify-center mb-4">
                  <Icon name="ShieldAlert" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Модерация контента</h3>
                <p className="text-sm text-muted-foreground">Проверка и блокировка материалов</p>
              </Card>

              <Card className="p-6 hover:border-vivid-blue/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl gradient-blue-purple flex items-center justify-center mb-4">
                  <Icon name="Flag" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Жалобы и нарушения</h3>
                <p className="text-sm text-muted-foreground">Обработка репортов пользователей</p>
              </Card>
            </div>

            <Card className="p-6 glass-morphism">
              <h3 className="font-semibold mb-4">Быстрые действия</h3>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-2xl">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить администратора
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки платформы
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLogin('guest')}
              className="text-xs"
            >
              Гость
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLogin('user')}
              className="text-xs"
            >
              Пользователь
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLogin('admin')}
              className="text-xs"
            >
              Админ
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLogin('owner')}
              className="text-xs"
            >
              Владелец
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
