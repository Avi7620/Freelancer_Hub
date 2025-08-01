import React, { useState } from 'react';
import {
  Search,
  Plus,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  Circle,
  CheckCircle2,
  MessageCircle,
  Clock,
  User,
  Building,
  Mail,
  Calendar
} from 'lucide-react';

const MessagesSection = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechFlow Inc.',
      avatar: 'SJ',
      lastMessage: 'The dashboard looks amazing! Can we schedule a call to discuss the next phase?',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      project: 'SaaS Dashboard Redesign',
      email: 'sarah@techflow.com'
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'StartupLab',
      avatar: 'MC',
      lastMessage: 'I\'ve reviewed the UI kit components. Overall great work, just a few minor adjustments needed.',
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      project: 'Mobile App UI Kit',
      email: 'mike@startuplab.io'
    },
    {
      id: 3,
      name: 'Emma Davis',
      company: 'RetailPro',
      avatar: 'ED',
      lastMessage: 'When can we expect the final delivery? The launch date is approaching.',
      timestamp: '3 hours ago',
      unread: 1,
      online: false,
      project: 'E-commerce Platform',
      email: 'emma@retailpro.com'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      company: 'Creative Studio',
      avatar: 'AR',
      lastMessage: 'Perfect! The brand guidelines document is exactly what we needed.',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      project: 'Brand Identity Package',
      email: 'alex@creativestudio.com'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      company: 'Digital Agency',
      avatar: 'LT',
      lastMessage: 'The website performance has improved significantly. Thank you!',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      project: 'Website Optimization',
      email: 'lisa@digitalagency.com'
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: 'client',
        content: 'Hi John! I hope you\'re doing well. I wanted to touch base about the dashboard project.',
        timestamp: '10:30 AM',
        date: 'Today'
      },
      {
        id: 2,
        sender: 'me',
        content: 'Hi Sarah! I\'m doing great, thank you. The project is progressing well. I\'ve completed the user research phase and started working on the wireframes.',
        timestamp: '10:35 AM',
        date: 'Today'
      },
      {
        id: 3,
        sender: 'client',
        content: 'That sounds fantastic! I\'m excited to see the wireframes. Do you have an estimated timeline for the first draft?',
        timestamp: '10:40 AM',
        date: 'Today'
      },
      {
        id: 4,
        sender: 'me',
        content: 'I should have the initial wireframes ready by end of this week. I\'ll share them with you for feedback before moving to the visual design phase.',
        timestamp: '10:45 AM',
        date: 'Today'
      },
      {
        id: 5,
        sender: 'client',
        content: 'Perfect! Also, I wanted to let you know that we might need to add a few more dashboard widgets. Would that affect the timeline significantly?',
        timestamp: '11:00 AM',
        date: 'Today'
      },
      {
        id: 6,
        sender: 'me',
        content: 'That shouldn\'t be a problem. Depending on the complexity of the widgets, it might add 3-5 days to the timeline. Can you share more details about what you have in mind?',
        timestamp: '11:05 AM',
        date: 'Today'
      },
      {
        id: 7,
        sender: 'client',
        content: 'The dashboard looks amazing! Can we schedule a call to discuss the next phase?',
        timestamp: '2:28 PM',
        date: 'Today'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'client',
        content: 'Hey John, I\'ve had a chance to review the UI kit components you sent over.',
        timestamp: '9:15 AM',
        date: 'Today'
      },
      {
        id: 2,
        sender: 'me',
        content: 'Great! What are your thoughts? Any feedback or changes needed?',
        timestamp: '9:20 AM',
        date: 'Today'
      },
      {
        id: 3,
        sender: 'client',
        content: 'I\'ve reviewed the UI kit components. Overall great work, just a few minor adjustments needed.',
        timestamp: '1:30 PM',
        date: 'Today'
      }
    ]
  };

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const conversationMessages = messages[selectedConversation] || [];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-gray-400 mt-1">Communicate with your clients</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Message</span>
        </button>
      </div>

      <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-700 ${
                  selectedConversation === conversation.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{conversation.company}</p>
                    <p className="text-sm text-gray-300 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-blue-400 mt-1">{conversation.project}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {selectedConv.avatar}
                    </div>
                    {selectedConv.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedConv.name}</h3>
                    <p className="text-sm text-gray-400">{selectedConv.company}</p>
                    <p className="text-xs text-blue-400">{selectedConv.project}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversationMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Client Info Sidebar */}
        {selectedConv && (
          <div className="w-80 border-l border-gray-700 p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {selectedConv.avatar}
              </div>
              <h3 className="font-semibold text-white text-lg">{selectedConv.name}</h3>
              <p className="text-gray-400">{selectedConv.company}</p>
              <div className="flex items-center justify-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${selectedConv.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <span className="text-sm text-gray-400">{selectedConv.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedConv.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedConv.company}
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Current Project</h4>
                <p className="text-sm text-blue-400">{selectedConv.project}</p>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Star className="w-4 h-4 mr-2" />
                  Add to Favorites
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;