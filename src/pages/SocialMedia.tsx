
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { socialMediaAccounts, platforms, eras } from '@/data/socialmedia';
import { SocialMediaAccount } from '@/types/socialmedia';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { AlertCircle, Instagram, Twitter, Facebook, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SocialMedia = () => {
  const [filteredAccounts, setFilteredAccounts] = useState<SocialMediaAccount[]>([]);
  const [filters, setFilters] = useState({
    era: 'all',
    platform: 'all',
    active: 'all',
    query: '',
    page: 1
  });
  
  // Items per page
  const itemsPerPage = 10;
  
  useEffect(() => {
    // Apply filters
    let results = socialMediaAccounts;
    
    // Filter by era
    if (filters.era !== 'all') {
      results = results.filter(account => account.era === filters.era);
    }
    
    // Filter by platform
    if (filters.platform !== 'all') {
      results = results.filter(account => account.platform === filters.platform);
    }
    
    // Filter by active status
    if (filters.active !== 'all') {
      const isActive = filters.active === 'active';
      results = results.filter(account => account.still_used === isActive);
    }
    
    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(account => 
        account.username.toLowerCase().includes(query) || 
        account.platform.toLowerCase().includes(query) ||
        (account.notes && account.notes.toLowerCase().includes(query))
      );
    }
    
    setFilteredAccounts(results);
  }, [filters]);
  
  // Get current page items
  const indexOfLastItem = filters.page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
      case 'x (twitter)':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center carti-font tracking-wide text-gradient">CARTI SOCIAL MEDIA ACCOUNTS</h1>
        
        {/* Filters */}
        <Card className="glass mb-8 shadow-lg">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4 text-zinc-200">Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Era Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Era</h3>
                <ToggleGroup 
                  type="single" 
                  value={filters.era} 
                  onValueChange={(value) => value && setFilters(prev => ({ ...prev, era: value, page: 1 }))}
                  className="justify-start flex-wrap"
                >
                  <ToggleGroupItem value="all" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                    All
                  </ToggleGroupItem>
                  {eras.map((era) => (
                    <ToggleGroupItem 
                      key={era} 
                      value={era} 
                      className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white"
                    >
                      {era}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              {/* Platform Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Platform</h3>
                <ToggleGroup 
                  type="single" 
                  value={filters.platform} 
                  onValueChange={(value) => value && setFilters(prev => ({ ...prev, platform: value, page: 1 }))}
                  className="justify-start flex-wrap"
                >
                  <ToggleGroupItem value="all" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                    All
                  </ToggleGroupItem>
                  {platforms.map((platform) => (
                    <ToggleGroupItem 
                      key={platform} 
                      value={platform} 
                      className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white"
                    >
                      {platform}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Status</h3>
                <ToggleGroup 
                  type="single" 
                  value={filters.active} 
                  onValueChange={(value) => value && setFilters(prev => ({ ...prev, active: value, page: 1 }))}
                  className="justify-start"
                >
                  <ToggleGroupItem value="all" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem value="active" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                    Active
                  </ToggleGroupItem>
                  <ToggleGroupItem value="inactive" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                    Inactive
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              {/* Search */}
              <div className="md:col-span-3">
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Search</h3>
                <Input 
                  type="search" 
                  placeholder="Search by username, platform, or notes..." 
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value, page: 1 }))}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Results */}
        <Card className="glass overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-200">Results</h2>
            <Badge variant="outline" className="bg-black/60 border-white/20 text-white/80">
              {filteredAccounts.length} accounts found
            </Badge>
          </div>
          
          <div className="p-3">
            <Table>
              <TableHeader className="bg-black/60">
                <TableRow>
                  <TableHead className="text-zinc-300">Platform</TableHead>
                  <TableHead className="text-zinc-300">Username</TableHead>
                  <TableHead className="text-zinc-300">Era</TableHead>
                  <TableHead className="text-zinc-300">Status</TableHead>
                  <TableHead className="text-zinc-300">Last Post</TableHead>
                  <TableHead className="text-zinc-300">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((account) => (
                    <TableRow key={account.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(account.platform)}
                          {account.platform}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {account.link ? (
                          <a 
                            href={account.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {account.username}
                          </a>
                        ) : (
                          <span>{account.username}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-black/60 border-white/20 text-white/80">
                          {account.era}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant={account.still_used ? "outline" : "secondary"} 
                                className={account.still_used ? "bg-black/60 border-green-600/50 text-green-500" : "bg-white/5 text-zinc-400"}
                              >
                                {account.still_used ? 'Active' : 'Inactive'}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black/90 border-white/10 text-white/90">
                              {account.still_used 
                                ? 'This account is currently in use' 
                                : 'This account is no longer in use'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-zinc-400">
                        {account.last_post || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {account.notes ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-300" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-black/90 border-white/10 text-white/90">
                                {account.notes}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-zinc-400">
                      No accounts match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4 border-t border-white/10 flex justify-center">
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Prev
                </button>
                <span className="px-3 py-1 glass text-zinc-300 rounded">
                  Page {filters.page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed' 
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocialMedia;
