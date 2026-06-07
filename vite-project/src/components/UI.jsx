import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export function Toast({ type = 'info', message, onClose }) {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  }[type];

  return (
    <div className={`fixed top-4 right-4 max-w-sm border rounded-lg p-4 shadow-lg flex items-start gap-3 z-50 ${bgColor}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${textColor}`} />
      <p className={`text-sm font-semibold ${textColor} flex-1`}>{message}</p>
      <button onClick={onClose} className={`p-1 hover:bg-white/50 rounded transition`}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-semibold">Carregando...</p>
      </div>
    </div>
  );
}

export function EmptyState({ title = 'Nenhum resultado', message = 'Não há dados para exibir' }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg">
      <div className="mb-4">
        <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-slate-600 font-semibold text-lg">{title}</p>
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}
