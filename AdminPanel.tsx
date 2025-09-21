import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { ArrowLeft, Plus, Edit, Trash2, Tag, Settings, Database, BarChart3, Play, RefreshCw, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminPanelProps {
  user: any;
  onBack: () => void;
}

export function AdminPanel({ user, onBack }: AdminPanelProps) {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [scrapingConfig, setScrapingConfig] = useState({});
  const [analytics, setAnalytics] = useState(null);
  const [dataOverview, setDataOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCode, setEditingCode] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    percentage: '',
    maxUses: '',
    expiryDate: ''
  });

  useEffect(() => {
    if (user?.email === 'admin@bookingint.com') {
      fetchDiscountCodes();
      fetchScrapingStatus();
      fetchAnalytics();
      fetchDataOverview();
    }
  }, [user]);

  const fetchDiscountCodes = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/discount-codes`, {
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setDiscountCodes(result.codes || []);
      }
    } catch (error) {
      console.error('Failed to fetch discount codes:', error);
      // Mock data for demo
      setDiscountCodes([
        {
          id: 1,
          code: 'WELCOME10',
          description: 'Welcome discount for new users',
          percentage: 10,
          maxUses: 100,
          usedCount: 15,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 2,
          code: 'SUMMER25',
          description: 'Summer vacation special',
          percentage: 25,
          maxUses: 50,
          usedCount: 8,
          expiryDate: '2024-08-31',
          active: true
        },
        {
          id: 3,
          code: 'FLIGHT15',
          description: 'Flight booking discount',
          percentage: 15,
          maxUses: 200,
          usedCount: 45,
          expiryDate: '2024-12-31',
          active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchScrapingStatus = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/scraping/status`, {
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setScrapingConfig(result.scrapingConfig || {});
      }
    } catch (error) {
      console.error('Failed to fetch scraping status:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/analytics`, {
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setAnalytics(result.analytics || {});
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const fetchDataOverview = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/data/overview`, {
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setDataOverview(result);
      }
    } catch (error) {
      console.error('Failed to fetch data overview:', error);
    }
  };

  const handleSaveCode = async () => {
    try {
      const method = editingCode ? 'PUT' : 'POST';
      const url = editingCode 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/discount-codes/${editingCode.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/discount-codes`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editingCode ? 'Discount code updated!' : 'Discount code created!');
        fetchDiscountCodes();
        handleCloseModal();
      } else {
        toast.error('Failed to save discount code');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
      console.error('Save error:', error);
    }
  };

  const handleDeleteCode = async (id: number) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/discount-codes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        toast.success('Discount code deleted!');
        fetchDiscountCodes();
      } else {
        toast.error('Failed to delete discount code');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  const handleEditCode = (code) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      description: code.description,
      percentage: code.percentage.toString(),
      maxUses: code.maxUses.toString(),
      expiryDate: code.expiryDate
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCode(null);
    setFormData({
      code: '',
      description: '',
      percentage: '',
      maxUses: '',
      expiryDate: ''
    });
  };

  const handleTriggerScraping = async (service) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/scraping/trigger/${service}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        toast.success(`${service} scraping triggered successfully!`);
        fetchScrapingStatus();
        setTimeout(() => {
          fetchScrapingStatus();
          fetchDataOverview();
        }, 3000);
      } else {
        toast.error(`Failed to trigger ${service} scraping`);
      }
    } catch (error) {
      toast.error('An error occurred while triggering scraping');
    }
  };

  const handleToggleScrapingService = async (service, enabled) => {
    try {
      const updatedConfig = {
        ...scrapingConfig,
        [service]: {
          ...scrapingConfig[service],
          enabled
        }
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/admin/scraping/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        },
        body: JSON.stringify(updatedConfig)
      });

      if (response.ok) {
        setScrapingConfig(updatedConfig);
        toast.success(`${service} scraping ${enabled ? 'enabled' : 'disabled'}`);
      } else {
        toast.error('Failed to update scraping configuration');
      }
    } catch (error) {
      toast.error('An error occurred while updating scraping configuration');
    }
  };

  if (user?.email !== 'admin@bookingint.com') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
          <Button onClick={onBack}>Go back</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Button>

        <h1 className="text-3xl mb-8">Admin Panel</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="scraping" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Data Scraping</span>
            </TabsTrigger>
            <TabsTrigger value="discounts" className="flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Discount Codes</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalBookings}</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <span className="text-lg">💰</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${analytics.totalRevenue?.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Discount Codes</CardTitle>
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.activeDiscountCodes}</div>
                    <p className="text-xs text-muted-foreground">
                      Out of {discountCodes.length} total
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">User Registrations</CardTitle>
                    <span className="text-lg">👥</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.userRegistrations}</div>
                    <p className="text-xs text-muted-foreground">
                      +23% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {dataOverview && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{dataOverview.flights?.count || 0}</div>
                      <div className="text-sm text-gray-600">Flights</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{dataOverview.hotels?.count || 0}</div>
                      <div className="text-sm text-gray-600">Hotels</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{dataOverview.cars?.count || 0}</div>
                      <div className="text-sm text-gray-600">Cars</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{dataOverview.attractions?.count || 0}</div>
                      <div className="text-sm text-gray-600">Attractions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{dataOverview.taxis?.count || 0}</div>
                      <div className="text-sm text-gray-600">Taxis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scraping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Data Scraping Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(scrapingConfig).map(([service, config]) => (
                    <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium capitalize">{service}</h4>
                          <p className="text-sm text-gray-600">
                            Last run: {config.lastRun ? new Date(config.lastRun).toLocaleString() : 'Never'}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs">Status:</span>
                            <Badge variant={config.status === 'running' ? 'default' : config.status === 'completed' ? 'secondary' : 'outline'}>
                              {config.status === 'running' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                              {config.status === 'completed' && <Clock className="w-3 h-3 mr-1" />}
                              {config.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`${service}-toggle`} className="text-sm">Enabled</Label>
                          <Switch
                            id={`${service}-toggle`}
                            checked={config.enabled}
                            onCheckedChange={(enabled) => handleToggleScrapingService(service, enabled)}
                          />
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTriggerScraping(service)}
                          disabled={config.status === 'running' || !config.enabled}
                        >
                          {config.status === 'running' ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Running
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Trigger
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discounts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Discount Codes Management</h2>
              <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Discount Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCode ? 'Edit Discount Code' : 'Add Discount Code'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="code">Code</Label>
                      <Input
                        id="code"
                        value={formData.code}
                        onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                        placeholder="DISCOUNT10"
                        maxLength={20}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Description of the discount"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="percentage">Discount Percentage</Label>
                      <Input
                        id="percentage"
                        type="number"
                        min="1"
                        max="100"
                        value={formData.percentage}
                        onChange={(e) => setFormData(prev => ({ ...prev, percentage: e.target.value }))}
                        placeholder="10"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxUses">Maximum Uses</Label>
                      <Input
                        id="maxUses"
                        type="number"
                        min="1"
                        value={formData.maxUses}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxUses: e.target.value }))}
                        placeholder="100"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSaveCode} className="flex-1">
                        {editingCode ? 'Update' : 'Create'}
                      </Button>
                      <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountCodes.map((code) => (
                      <TableRow key={code.id}>
                        <TableCell className="font-mono">{code.code}</TableCell>
                        <TableCell>{code.description}</TableCell>
                        <TableCell>{code.percentage}%</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{code.usedCount || 0}/{code.maxUses}</span>
                            <Progress 
                              value={((code.usedCount || 0) / code.maxUses) * 100} 
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{code.expiryDate}</TableCell>
                        <TableCell>
                          <Badge variant={code.active ? 'default' : 'secondary'}>
                            {code.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCode(code)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCode(code.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications about bookings and system updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-update Pricing</Label>
                      <p className="text-sm text-gray-600">Automatically update prices based on scraped data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}