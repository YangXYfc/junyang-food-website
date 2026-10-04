const paths={
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  leaf:'<path d="M20 3c-10 0-17 4-17 11a7 7 0 0 0 7 7C17 21 21 13 20 3Z"/><path d="M3 21 15 9M8 16v-5m0 5h5"/>',
  sprout:'<path d="M12 21v-9M12 15C6 15 3 11 3 5c6 0 9 3 9 10Zm0-3c0-6 3-9 9-9 0 6-3 9-9 9Z"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  book:'<path d="M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v16"/>',
  shield:'<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6z"/><path d="m8 12 3 3 5-6"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  down:'<path d="m5 9 7 7 7-7"/>',
  collapse:'<path d="m13 6-6 6 6 6m7-12-6 6 6 6"/>',
  expand:'<path d="m4 6 6 6-6 6m7-12 6 6-6 6"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',
  file:'<path d="M6 2h9l5 5v15H6zM15 2v6h5M9 12h8M9 16h8"/>',
  back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>'
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.leaf}</svg>`;
