/**
 * ASSETS REPOSITORY (Centralized Links)
 */
const ASSETS_REPOSITORY = {
    'eps_1': [
        { 
            _id: 'eps_1_01',
            name: 'EPS-Resource-v1.pdf', 
            url: 'https://drive.google.com/file/d/1XA4OlyouD4YUUZ7eyN_BM_M_ux91zTMR/view?usp=sharing',
            type: 'Google Drive',
            size: 'Cloud Access'
        }
    ]
};

/**
 * SUBJECT DATA STRUCTURE (Organized by Branch)
 * isMain: true - Only these subjects show up on the "All Streams" landing page.
 */
const BRANCH_DATA = {
    'Electrical': [
        { _id: 'e1', isMain: true, name: 'Electrical Circuit Analysis', branch: 'Electrical', description: 'Circuit laws, network theorems and analysis.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'e2', name: 'Electrical Machines 1', branch: 'Electrical', description: 'DC machines and transformers.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'e3', name: 'Electrical Machines 2', branch: 'Electrical', description: 'Induction and synchronous machines.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'e4', name: 'Network Analysis and Synthesis', branch: 'Electrical', description: 'Two port networks and network theorems.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'eps_1', isMain: true, name: 'Electrical Power System', branch: 'Electrical', description: 'Generation, transmission and distribution.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'e6', name: 'Power Electronics', branch: 'Electrical', description: 'Converters, inverters and power devices.', icon: 'zap', theme: 'branch-elec' },
        { _id: 'e7', name: 'Electrical Drives', branch: 'Electrical', description: 'Speed control of electric motors.', icon: 'zap', theme: 'branch-elec' }
    ],
    'Electronics': [
        { _id: 'x1', name: 'Electronic Devices and Circuits', branch: 'Electronics', description: 'Diodes, transistors and amplifiers.', icon: 'activity', theme: 'branch-extc' },
        { _id: 'x2', isMain: true, name: 'Digital Electronics', branch: 'Electronics', description: 'Logic gates, flip flops and counters.', icon: 'activity', theme: 'branch-extc' },
        { _id: 'x3', isMain: true, name: 'Microprocessor and Microcontroller', branch: 'Electronics', description: '8085 architecture and embedded systems.', icon: 'activity', theme: 'branch-extc' },
        { _id: 'x4', name: 'Digital Signal Processing', branch: 'Electronics', description: 'Discrete signals and digital filters.', icon: 'activity', theme: 'branch-extc' },
        { _id: 'x5', name: 'Modern Instrumentation Techniques', branch: 'Electronics', description: 'Sensors and measurement systems.', icon: 'activity', theme: 'branch-extc' }
    ],
    'CS & IT': [
        { _id: 'c1', isMain: true, name: 'Software Engineering', branch: 'CS & IT', description: 'Development lifecycles and methodologies.', icon: 'layers', theme: 'branch-cs' },
        { _id: 'c2', isMain: true, name: 'Operating Systems', branch: 'CS & IT', description: 'Kernel logic and process scheduling.', icon: 'cpu', theme: 'branch-cs' }
    ],
    'Mechanical': [],
    'Civil': []
};

let state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    vault: JSON.parse(localStorage.getItem('vault')) || [], 
    currentView: 'home',
    currentBranch: 'All',
    authMode: 'student',
    isLogin: true,
    selectedFile: null
};

const app = {
    getAllSubjects: () => Object.values(BRANCH_DATA).flat(),

    setBranch: (branch) => {
        state.currentBranch = branch;
        document.querySelectorAll('.branch-chip').forEach(btn => {
            const isAll = (branch === 'All' && btn.textContent === 'All Streams');
            const isSpecific = btn.textContent.includes(branch) && branch !== 'All';
            btn.classList.toggle('active', isAll || isSpecific);
        });
        app.fetchSubjects();
    },

    setAuthMode: (mode) => {
        state.authMode = mode;
        state.isLogin = true;
        document.getElementById('tab-student').classList.toggle('active', mode === 'student');
        document.getElementById('tab-admin').classList.toggle('active', mode === 'admin');
        const title = document.getElementById('auth-title');
        const subtitle = document.getElementById('auth-subtitle');
        const toggleBtn = document.getElementById('auth-toggle');
        const icon = document.getElementById('auth-main-icon');
        document.getElementById('name-field').classList.add('hidden');
        if(mode === 'admin') {
            title.textContent = 'Admin Gateway';
            subtitle.textContent = 'Management verification';
            toggleBtn.classList.add('hidden');
            icon.setAttribute('data-lucide', 'shield-check');
        } else {
            title.textContent = 'Welcome Student';
            subtitle.textContent = 'Access your repository';
            toggleBtn.classList.remove('hidden');
            toggleBtn.textContent = 'Need an account? Sign up';
            icon.setAttribute('data-lucide', 'user');
        }
        lucide.createIcons();
    },

    searchSubjects: (query) => {
        if(state.currentView !== 'home') router.navigate('home');
        const q = query.toLowerCase();
        const all = app.getAllSubjects();
        const filtered = all.filter(s => {
            const matchesName = s.name.toLowerCase().includes(q);
            const matchesBranch = (state.currentBranch === 'All') 
                ? (s.isMain || matchesName) 
                : (s.branch === state.currentBranch);
            return matchesName && matchesBranch;
        });
        app.renderSubjects(filtered);
    },

    renderSubjects: (data) => {
        const grid = document.getElementById('subjects-grid');
        if (data.length === 0) {
            grid.innerHTML = `<div class="col-span-full py-20 text-center font-black text-slate-300 uppercase tracking-widest text-xs">No hubs found.</div>`;
            return;
        }
        grid.innerHTML = data.map(subj => {
            const assetCount = ASSETS_REPOSITORY[subj._id]?.length || 0;
            return `
            <div class="subject-card ${subj.theme} bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer group" onclick="router.navigate('files', {id: '${subj._id}'})">
                <div class="flex justify-between items-start mb-6 md:mb-8">
                    <div class="w-12 h-12 md:w-14 md:h-14 bg-[var(--b-bg)] rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i data-lucide="${subj.icon || 'book'}" style="color: var(--b-clr)" class="w-6 h-6 md:w-7 md:h-7"></i>
                    </div>
                    <span class="text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-black px-3 py-1.5 rounded-full bg-[var(--b-bg)]" style="color: var(--b-clr)">${subj.branch}</span>
                </div>
                <h3 class="text-lg md:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight tracking-tight">${subj.name} ${subj.isMain ? '<span class="text-[8px] align-middle ml-1 opacity-40">★</span>' : ''}</h3>
                <p class="text-slate-400 text-xs md:text-sm mt-3 md:mt-4 font-medium line-clamp-2 leading-relaxed">${subj.description}</p>
                <div class="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div class="flex items-center text-slate-900 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                        <i data-lucide="files" class="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 text-slate-200"></i>
                        <span>${assetCount} Assets</span>
                    </div>
                    <div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5 md:w-4 md:h-4"></i>
                    </div>
                </div>
            </div>`;
        }).join('');
        lucide.createIcons();
    },

    fetchSubjects: async () => {
        ui.setLoading(true);
        setTimeout(() => {
            let data = [];
            if (state.currentBranch === 'All') {
                data = app.getAllSubjects().filter(s => s.isMain);
            } else {
                data = BRANCH_DATA[state.currentBranch] || [];
            }
            app.renderSubjects(data);
            ui.setLoading(false);
        }, 300);
    },

    fetchFiles: async (subjId) => {
        ui.setLoading(true);
        setTimeout(() => {
            const subject = app.getAllSubjects().find(s => s._id === subjId);
            document.getElementById('current-subject-title').textContent = subject?.name || 'Hub Details';
            document.getElementById('current-subject-desc').textContent = subject?.description || '';
            document.getElementById('file-branch-tag').textContent = subject?.branch || 'General';
            
            const list = document.getElementById('files-list');
            const files = ASSETS_REPOSITORY[subjId] || [];

            if (files.length === 0) {
                list.innerHTML = `
                    <div class="bg-white/50 border-2 border-dashed border-slate-200 p-10 rounded-[2rem] text-center">
                        <i data-lucide="folder-open" class="w-10 h-10 text-slate-300 mx-auto mb-4"></i>
                        <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No resources available yet</p>
                    </div>`;
            } else {
                list.innerHTML = files.map((file, idx) => {
                    let downloadUrl = file.url;
                    if (file.url.includes('drive.google.com')) {
                        downloadUrl = file.url.replace('/view?usp=sharing', '').replace('/file/d/', '/uc?export=download&id=');
                    }

                    return `
                    <div class="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between hover:border-indigo-200 transition-all group gap-4">
                        <div class="flex items-center w-full">
                            <div class="bg-slate-50 p-4 md:p-5 rounded-xl md:rounded-2xl mr-4 md:mr-6 group-hover:bg-indigo-600 transition-colors">
                                <i data-lucide="${file.type === 'Google Drive' ? 'cloud' : 'file-text'}" class="text-slate-300 w-6 h-6 md:w-7 md:h-7 group-hover:text-white transition-colors"></i>
                            </div>
                            <div class="truncate">
                                <h4 class="font-black text-slate-900 text-base md:text-lg tracking-tight truncate">${file.name}</h4>
                                <div class="flex items-center text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 md:mt-2">
                                    <span class="mr-3 md:mr-4 text-indigo-500">${file.type}</span>
                                    <span>${file.size}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                            <button onclick="app.downloadToVault('${subjId}', ${idx})" class="px-5 py-3 bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center">
                                <i data-lucide="download" class="w-4 h-4 mr-2"></i> Download
                            </button>
                            <a href="${file.url}" target="_blank" class="px-6 py-3 brand-gradient text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg text-center flex items-center justify-center">
                                <i data-lucide="eye" class="w-4 h-4 mr-2"></i> View
                            </a>
                        </div>
                    </div>`;
                }).join('');
            }
            lucide.createIcons();
            ui.setLoading(false);
        }, 400);
    },

    downloadToVault: (subjId, fileIdx) => {
        const subject = app.getAllSubjects().find(s => s._id === subjId);
        const file = ASSETS_REPOSITORY[subjId][fileIdx];
        
        if (!file) return;

        const vaultItem = {
            subjId: subjId,
            subjName: subject.name,
            branch: subject.branch,
            fileName: file.name,
            url: file.url,
            timestamp: Date.now()
        };

        const exists = state.vault.find(v => v.url === file.url);
        if (!exists) {
            state.vault.unshift(vaultItem);
            localStorage.setItem('vault', JSON.stringify(state.vault));
        }

        let downloadUrl = file.url;
        if (file.url.includes('drive.google.com')) {
            downloadUrl = file.url.replace('/view?usp=sharing', '').replace('/file/d/', '/uc?export=download&id=');
        }
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = "_blank";
        link.click();
    },

    renderOfflineFiles: () => {
        const list = document.getElementById('offline-files-list');
        if (state.vault.length === 0) {
            list.innerHTML = `
                <div class="col-span-full py-20 bg-white/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center">
                    <i data-lucide="package-open" class="w-12 h-12 text-slate-300 mx-auto mb-4"></i>
                    <h3 class="text-xl font-black text-slate-900 mb-2">Your Vault is Empty</h3>
                    <p class="text-slate-400 font-medium max-w-xs mx-auto text-sm">Download materials to sync them with your offline vault.</p>
                    <button onclick="router.navigate('home')" class="mt-8 px-8 py-3 brand-gradient text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Explore Library</button>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        list.innerHTML = state.vault.map((v, idx) => `
            <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
                <div class="flex items-start justify-between mb-6">
                    <div class="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <i data-lucide="file-text" class="w-6 h-6"></i>
                    </div>
                    <button onclick="app.removeFromVault(${idx})" class="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                    </button>
                </div>
                <div class="mb-6">
                    <span class="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1 block">${v.branch} Hub</span>
                    <h4 class="text-lg font-black text-slate-900 tracking-tight leading-tight line-clamp-1">${v.fileName}</h4>
                    <p class="text-xs text-slate-400 font-medium mt-1">${v.subjName}</p>
                </div>
                <a href="${v.url}" target="_blank" class="w-full py-3.5 bg-slate-50 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all">
                    Open from Vault
                </a>
            </div>
        `).join('');
        lucide.createIcons();
    },

    removeFromVault: (idx) => {
        state.vault.splice(idx, 1);
        localStorage.setItem('vault', JSON.stringify(state.vault));
        app.renderOfflineFiles();
    },

    clearVault: () => {
        state.vault = [];
        localStorage.removeItem('vault');
        app.renderOfflineFiles();
    },

    handleFileSelection: (e) => {
        const file = e.target.files[0];
        if (file) {
            state.selectedFile = file;
            const info = document.getElementById('file-info');
            info.textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            info.classList.remove('hidden');
        }
    },

    uploadFile: () => {
        if (!state.selectedFile) return;
        ui.setLoading(true);
        setTimeout(() => {
            ui.setLoading(false);
            ui.hideModal();
        }, 1500);
    },

    createSubject: () => {
        const name = document.getElementById('new-subj-name').value;
        if (!name) return;
        ui.setLoading(true);
        setTimeout(() => {
            ui.setLoading(false);
            ui.hideModal();
            app.fetchSubjects();
        }, 1000);
    },

    logout: () => { 
        localStorage.clear(); 
        state.user = null; 
        state.vault = [];
        router.navigate('home'); 
    }
};

const ui = {
    toggleMobileSearch: (show) => {
        const overlay = document.getElementById('mobile-search-overlay');
        const logo = document.getElementById('nav-logo');
        const actions = document.getElementById('nav-actions');
        if (show) {
            overlay.classList.remove('hidden');
            overlay.classList.add('active');
            logo.classList.add('invisible');
            actions.classList.add('invisible');
            document.getElementById('mobile-search-input').focus();
        } else {
            overlay.classList.add('hidden');
            overlay.classList.remove('active');
            logo.classList.remove('invisible');
            actions.classList.remove('invisible');
            app.searchSubjects('');
            document.getElementById('mobile-search-input').value = '';
        }
    },

    updateAuthUI: () => {
        const authNav = document.getElementById('auth-nav');
        if (state.user) {
            authNav.innerHTML = `
                <div class="flex items-center">
                    <div class="text-right mr-3 md:mr-5 hidden md:block">
                        <div class="text-[10px] md:text-xs font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">${state.user.name}</div>
                        <div class="text-[7px] md:text-[8px] font-bold text-indigo-500 uppercase tracking-widest">${state.user.role === 'admin' ? 'Admin Gateway' : 'Portal Access'}</div>
                    </div>
                    <button onclick="app.logout()" class="w-10 h-10 md:w-11 md:h-11 bg-rose-50 text-rose-500 rounded-xl md:rounded-2xl flex items-center justify-center transition-all hover:bg-rose-600 hover:text-white border border-rose-100">
                        <i data-lucide="power" class="w-4 h-4 md:w-5 md:h-5"></i>
                    </button>
                </div>
            `;
            document.getElementById('admin-actions')?.classList.toggle('hidden', state.user.role !== 'admin');
            document.getElementById('admin-file-actions')?.classList.toggle('hidden', state.user.role !== 'admin');
        } else {
            authNav.innerHTML = `
                <button onclick="router.navigate('auth')" class="brand-gradient text-white p-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center min-w-[40px] md:min-w-0">
                    <span class="hidden md:inline">Access</span>
                    <i data-lucide="log-in" class="md:hidden w-5 h-5"></i>
                </button>
            `;
        }
        lucide.createIcons();
    },

    setLoading: (isLoading) => {
        if(isLoading) {
            const l = document.createElement('div');
            l.id = 'loader';
            l.className = "fixed inset-0 z-[100] bg-white/70 backdrop-blur-md flex items-center justify-center";
            l.innerHTML = `<div class="w-10 h-10 md:w-12 md:h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>`;
            document.body.appendChild(l);
        } else {
            document.getElementById('loader')?.remove();
        }
    },

    showModal: (id) => { 
        document.getElementById('modal-container').classList.remove('hidden'); 
        document.getElementById(id).classList.remove('hidden'); 
    },

    hideModal: () => { 
        document.getElementById('modal-container').classList.add('hidden'); 
        document.querySelectorAll('#modal-container > div').forEach(d => d.classList.add('hidden')); 
    }
};

const router = {
    navigate: (view, params = {}) => {
        state.currentView = view;
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`view-${view}`);
        setTimeout(() => target.classList.add('active'), 50);
        
        if (view === 'home') app.fetchSubjects();
        if (view === 'files') app.fetchFiles(params.id);
        if (view === 'offline') app.renderOfflineFiles();
        
        ui.updateAuthUI();
        window.scrollTo({top:0, behavior:'smooth'});
    }
};

document.getElementById('auth-toggle').onclick = () => {
    state.isLogin = !state.isLogin;
    const title = document.getElementById('auth-title');
    const toggleBtn = document.getElementById('auth-toggle');
    const nameField = document.getElementById('name-field');
    if(state.isLogin) { 
        title.textContent = 'Welcome Student'; 
        toggleBtn.textContent = 'Need an account? Sign up'; 
        nameField.classList.add('hidden'); 
    } else { 
        title.textContent = 'Join GateHub'; 
        toggleBtn.textContent = 'Already have an account? Login'; 
        nameField.classList.remove('hidden'); 
    }
};

document.getElementById('auth-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('auth-name').value;
    state.user = { 
        name: state.authMode === 'admin' ? 'Admin Hub' : (name || 'Student Hub'), 
        role: state.authMode 
    };
    localStorage.setItem('user', JSON.stringify(state.user));
    router.navigate('home');
};

window.onload = () => { 
    lucide.createIcons(); 
    ui.updateAuthUI(); 
    app.fetchSubjects(); 
};