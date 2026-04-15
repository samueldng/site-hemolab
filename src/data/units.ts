export type Clinic = {
    id: string;
    name: string;
    type: "Própria" | "Parceira";
    city: string;
    coords: { x: number; y: number }; // X and Y in percentages relative to the map SVG (0-100)
    address: string;
    photo: string;
};

export const clinics: Clinic[] = [
    // ═══════════════════════════════════════════════
    // BACABAL — hub principal, cluster em (50, 35)
    // ═══════════════════════════════════════════════
    {
        id: "hemolab-matriz",
        name: "HemoLab Matriz",
        type: "Própria",
        city: "Bacabal-MA",
        coords: { x: 50.0, y: 35.0 },
        address: "Rua Magalhães de Almeida, n° 469, Centro",
        photo: "/hemolab/images/fachada-300x300.png",
    },
    {
        id: "mauricio-carvalho",
        name: "Centro Médico Maurício Carvalho",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 51.5, y: 33.8 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/centro_medico.png",
    },
    {
        id: "clinica-biorim",
        name: "Clínica Biorim",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 48.8, y: 36.0 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/Biorim.png",
    },
    {
        id: "clinica-ribeiro",
        name: "Clínica Ribeiro",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 51.2, y: 35.8 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/clinica_ribeiro.png",
    },
    {
        id: "clinica-santa-tereza",
        name: "Clínica Santa Tereza",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 49.2, y: 34.2 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/santa_tereza.png",
    },
    {
        id: "clinica-matergin",
        name: "Clínica Matergin",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 50.8, y: 36.5 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/MaterGin.png",
    },
    {
        id: "clinica-dr-saude-bacabal",
        name: "Clínica Dr. Saúde",
        type: "Parceira",
        city: "Bacabal-MA",
        coords: { x: 51.8, y: 34.5 },
        address: "Referência Parceira Bacabal",
        photo: "/hemolab/images/parceiros/drsaude_bacabal.png",
    },

    // ═══════════════════════════════════════════════
    // SATUBINHA — Local Próprio (noroeste de Bacabal)
    // ═══════════════════════════════════════════════
    {
        id: "hemolab-satubinha",
        name: "HemoLab Satubinha",
        type: "Própria",
        city: "Satubinha-MA",
        coords: { x: 37.4, y: 31.7 },
        address: "Unidade Satubinha",
        photo: "/hemolab/images/parceiros/hemolab-satubinha.png",
    },

    // ═══════════════════════════════════════════════
    // CIDADES INDIVIDUAIS — coordenadas baseadas no
    // mapa real (Google Maps → porcentagem no SVG)
    // ═══════════════════════════════════════════════

    // ─── Leste (São Mateus / Alto Alegre) ───
    {
        id: "multiclin-sao-mateus",
        name: "Clínica Multiclin",
        type: "Parceira",
        city: "São Mateus-MA",
        coords: { x: 68.9, y: 30.4 },
        address: "Unidade São Mateus",
        photo: "/hemolab/images/parceiros/multiclin_saomateus.png",
    },
    {
        id: "multiclin-alto-alegre",
        name: "Clínica Multiclin",
        type: "Parceira",
        city: "Alto Alegre-MA",
        coords: { x: 68.0, y: 35.6 },
        address: "Unidade Alto Alegre",
        photo: "/hemolab/images/parceiros/multiclin_altoalegre.png",
    },

    // ─── Noroeste (Pio XII / Lago Verde) ───
    {
        id: "dra-saude-pio-xii",
        name: "Clínica Dra. Saúde",
        type: "Parceira",
        city: "Pio XII-MA",
        coords: { x: 33.4, y: 29.8 },
        address: "Unidade Pio XII",
        photo: "/hemolab/images/parceiros/drsaude_pioxii.png",
    },
    {
        id: "mais-saude-lago-verde",
        name: "Clínica Mais Saúde",
        type: "Parceira",
        city: "Lago Verde-MA",
        coords: { x: 34.5, y: 31.5 },
        address: "Unidade Lago Verde",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ─── Norte (Conceição do Lago Açu) ───
    {
        id: "pedro-lustoza-lago-acu",
        name: "Clínica Dr. Pedro Lustoza",
        type: "Parceira",
        city: "Conceição do Lago Açu-MA",
        coords: { x: 47.8, y: 27.2 },
        address: "Unidade Conceição do Lago Açu",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ─── Oeste (Olho d'Água / Bom Lugar) ───
    {
        id: "maria-braga-olho-dagua",
        name: "Clínica Maria Braga",
        type: "Parceira",
        city: "Olho D'água das Cunhãs-MA",
        coords: { x: 41.0, y: 33.0 },
        address: "Unidade Olho D'água das Cunhãs",
        photo: "/hemolab/images/parceiros/clinica_mariabraga.png",
    },
    {
        id: "bem-estar-bom-lugar",
        name: "Clínica Bem Estar",
        type: "Parceira",
        city: "Bom Lugar-MA",
        coords: { x: 36.0, y: 38.9 },
        address: "Unidade Bom Lugar",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ═══════════════════════════════════════════════
    // LAGO DA PEDRA — cluster em (36.5, 45.1)
    // ═══════════════════════════════════════════════
    {
        id: "bem-estar-lago-da-pedra",
        name: "Clínica Bem Estar",
        type: "Parceira",
        city: "Lago da Pedra-MA",
        coords: { x: 36.5, y: 45.1 },
        address: "Unidade Lago da Pedra",
        photo: "/hemolab/images/parceiros/bemestar_lagodapedra.png",
    },
    {
        id: "mark-sanfieri-lago-da-pedra",
        name: "Clínica Dr. Mark Sanfieri",
        type: "Parceira",
        city: "Lago da Pedra-MA",
        coords: { x: 37.6, y: 45.9 },
        address: "Referência Lago da Pedra",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },
    {
        id: "ultramedic-lago-da-pedra",
        name: "Clínica Ultramedic",
        type: "Parceira",
        city: "Lago da Pedra-MA",
        coords: { x: 35.4, y: 44.3 },
        address: "Referência Lago da Pedra",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ─── Lago dos Rodrigues (entre Lago da Pedra e Esperantinópolis) ───
    {
        id: "bem-estar-lago-dos-rodrigues",
        name: "Clínica Bem Estar",
        type: "Parceira",
        city: "Lago dos Rodrigues-MA",
        coords: { x: 47.3, y: 45.4 },
        address: "Unidade Lago dos Rodrigues",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ═══════════════════════════════════════════════
    // ESPERANTINÓPOLIS — cluster em (48.7, 52.6)
    // ═══════════════════════════════════════════════
    {
        id: "sao-thiago-esperantinopolis",
        name: "Clínica São Thiago",
        type: "Parceira",
        city: "Esperantinópolis-MA",
        coords: { x: 48.7, y: 52.6 },
        address: "Referência Esperantinópolis",
        photo: "/hemolab/images/parceiros/clinica_saothiago.png",
    },
    {
        id: "ciomed-esperantinopolis",
        name: "Clínica Ciomed",
        type: "Parceira",
        city: "Esperantinópolis-MA",
        coords: { x: 49.6, y: 53.4 },
        address: "Referência Esperantinópolis",
        photo: "/hemolab/images/hemolab-satubinha-300x300.png",
    },

    // ═══════════════════════════════════════════════
    // CIDADES DISTANTES (Sul / Southwest)
    // ═══════════════════════════════════════════════
    {
        id: "ciomed-barra-do-corda",
        name: "Clínica Ciomed",
        type: "Parceira",
        city: "Barra do Corda-MA",
        coords: { x: 41.4, y: 70.8 },
        address: "Unidade Barra do Corda",
        photo: "/hemolab/images/parceiros/clinica_ciomed_barradocorda.png",
    },
    {
        id: "vitallis-lagoa-grande",
        name: "Clínica Vitallis",
        type: "Parceira",
        city: "Lagoa Grande-MA",
        coords: { x: 24.8, y: 57.2 },
        address: "Unidade Lagoa Grande",
        photo: "/hemolab/images/parceiros/Vitallis.png",
    },
];
