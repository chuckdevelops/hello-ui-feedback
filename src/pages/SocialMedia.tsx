
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { socialMediaAccounts, eras, platforms } from '@/data/socialmedia';
import { SocialMediaAccount, SocialMediaFilters } from '@/types/socialmedia';

const SocialMedia = () => {
  // Initial filters state
  const [filters, setFilters] = useState<SocialMediaFilters>({
    era: '',
    platform: '',
    active: '',
    query: '',
    page: 1
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState<SocialMediaAccount[]>([]);
  const accountsPerPage = 6;

  // Apply filters
  useEffect(() => {
    let result = [...socialMediaAccounts];
    
    // Filter by era
    if (filters.era) {
      result = result.filter(account => account.era === filters.era);
    }
    
    // Filter by platform
    if (filters.platform) {
      result = result.filter(account => account.platform === filters.platform);
    }
    
    // Filter by active status
    if (filters.active === 'yes') {
      result = result.filter(account => account.still_used);
    } else if (filters.active === 'no') {
      result = result.filter(account => !account.still_used);
    }
    
    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(account => 
        account.username.toLowerCase().includes(query) || 
        account.platform.toLowerCase().includes(query) ||
        (account.notes && account.notes.toLowerCase().includes(query))
      );
    }
    
    setFilteredAccounts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Pagination logic
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  // Handle filter changes
  const handleFilterChange = (key: keyof SocialMediaFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      era: '',
      platform: '',
      active: '',
      query: '',
      page: 1
    });
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 carti-font text-center">Playboi Carti Social Media Accounts</h1>
        
        {/* Filters Card */}
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-xl font-semibold">Filters</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="era-filter">Era</Label>
                <Select 
                  value={filters.era} 
                  onValueChange={(value) => handleFilterChange('era', value)}
                >
                  <SelectTrigger id="era-filter">
                    <SelectValue placeholder="All Eras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Eras</SelectItem>
                    {eras.map(era => (
                      <SelectItem key={era} value={era}>{era}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="platform-filter">Platform</Label>
                <Select 
                  value={filters.platform} 
                  onValueChange={(value) => handleFilterChange('platform', value)}
                >
                  <SelectTrigger id="platform-filter">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Platforms</SelectItem>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="active-filter">Status</Label>
                <Select 
                  value={filters.active} 
                  onValueChange={(value) => handleFilterChange('active', value)}
                >
                  <SelectTrigger id="active-filter">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="yes">Active</SelectItem>
                    <SelectItem value="no">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="search">Search</Label>
                <Input 
                  id="search" 
                  placeholder="Search accounts..." 
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              {(filters.era || filters.platform || filters.active || filters.query) && (
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentAccounts.length > 0 ? currentAccounts.map(account => (
            <Card key={account.id} className="h-full flex flex-col">
              <div className="h-28 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <span className="text-white text-2xl font-bold">{account.platform}</span>
                </div>
                {account.thumbnail && (
                  <img 
                    src={account.thumbnail} 
                    alt={account.platform} 
                    className="w-full h-full object-cover opacity-50"
                  />
                )}
              </div>
              <CardContent className="flex-grow pt-6">
                <h3 className="text-lg font-bold mb-1">{account.username}</h3>
                <p className="text-gray-500 text-sm mb-3">{account.platform}</p>
                
                {account.notes && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{account.notes}</p>
                )}
                
                <div className="flex justify-between items-center mt-auto">
                  <Badge variant="outline">{account.era}</Badge>
                  <Badge variant={account.still_used ? "success" : "secondary"}>
                    {account.still_used ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                {account.last_post && (
                  <p className="text-xs text-gray-500 mt-2">Last Post: {account.last_post}</p>
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{account.username} ({account.platform})</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1 h-40 bg-gray-800 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <span className="text-white text-xl font-bold">{account.platform}</span>
                          </div>
                          {account.thumbnail && (
                            <img 
                              src={account.thumbnail} 
                              alt={account.platform} 
                              className="w-full h-full object-cover opacity-50"
                            />
                          )}
                        </div>
                        <div className="md:col-span-3">
                          <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Username:</span> {account.username}</p>
                            <p><span className="font-medium">Platform:</span> {account.platform}</p>
                            <p><span className="font-medium">Era:</span> {account.era}</p>
                            <p><span className="font-medium">Last Post:</span> {account.last_post || 'Unknown'}</p>
                            <p>
                              <span className="font-medium">Status:</span> 
                              <Badge variant={account.still_used ? "success" : "secondary"} className="ml-2">
                                {account.still_used ? 'Active' : 'Inactive'}
                              </Badge>
                            </p>
                          </div>
                          
                          {account.notes && (
                            <div className="mt-4">
                              <h4 className="text-md font-semibold mb-1">Notes</h4>
                              <p className="text-sm">{account.notes}</p>
                            </div>
                          )}
                          
                          <div className="mt-4">
                            <h4 className="text-md font-semibold mb-1">Link</h4>
                            {account.link && account.link !== 'N/A' && account.link !== 'Deleted' ? (
                              <a 
                                href={account.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {account.link}
                              </a>
                            ) : (
                              <p className="text-sm text-gray-500">{account.link || 'No link available'}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {account.link && account.link !== 'N/A' && account.link !== 'Deleted' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(account.link || '', '_blank')}
                  >
                    Visit
                  </Button>
                )}
              </CardFooter>
            </Card>
          )) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No social media accounts found matching your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-2">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredAccounts.length > accountsPerPage && (
          <Pagination className="justify-center mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => goToPage(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page} 
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SocialMedia;
