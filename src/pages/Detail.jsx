import { useParams } from "react-router";
import { usePokemonService } from "../context/Context";
import './Detail.css';

const Detail = () => {
    const { id } = useParams();
    const pokemonServiceInstance = usePokemonService();
    const data = pokemonServiceInstance.GetPokemonById(id);

    const getStat = (statName) =>
        data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? '-';

    const hp = getStat('hp');
    const atk = getStat('attack');
    const def = getStat('defense');
    const spAtk = getStat('special-attack');
    const spDef = getStat('special-defense');
    const spd = getStat('speed');

    const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
    const primaryType = data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

    const typeColor = {
        normal: '#78716c',
        fire: '#f97316',
        water: '#3b82f6',
        electric: '#eab308',
        grass: '#16a34a',
        ice: '#22d3ee',
        fighting: '#b91c1c',
        poison: '#7c3aed',
        ground: '#d97706',
        flying: '#0ea5e9',
        psychic: '#ec4899',
        bug: '#65a30d',
        rock: '#b45309',
        ghost: '#4338ca',
        dragon: '#6366f1',
        dark: '#262626',
        steel: '#64748b',
        fairy: '#fb7185',
    };

    const primaryColor = typeColor[primaryType] ?? '#16a34a';

    const formatText = (value) =>
        value
            ?.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const imageUrl =
        data?.sprites?.other?.['official-artwork']?.front_default ||
        data?.sprites?.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

    const abilities = data?.abilities?.map((a) => formatText(a?.ability?.name)).filter(Boolean) ?? [];
    const height = data?.height != null ? `${(data.height / 10).toFixed(1)} m` : '-';
    const weight = data?.weight != null ? `${(data.weight / 10).toFixed(1)} kg` : '-';

    const allStats = [
        { label: 'HP', value: hp, max: 255, color: '#f97316' },
        { label: 'ATK', value: atk, max: 190, color: '#f97316' },
        { label: 'DEF', value: def, max: 230, color: '#f97316' },
        { label: 'SP.ATK', value: spAtk, max: 194, color: '#eab308' },
        { label: 'SP.DEF', value: spDef, max: 230, color: '#eab308' },
        { label: 'SPD', value: spd, max: 180, color: '#f97316' },
    ];

    return (
        <div className="detail-page">
            <div className="detail-header" style={{ backgroundColor: primaryColor }}>
                <img
                    className="detail-image"
                    src={imageUrl}
                    alt={data?.name || 'pokemon'}
                />
            </div>

            <div className="detail-body">
                <div className="detail-top-row">
                    <span className="detail-id">{`#${data?.id ?? '-'}`}</span>
                    <span className="detail-types">
                        {types.map((typeName) => (
                            <span
                                key={typeName}
                                className="detail-type-badge"
                                style={{ backgroundColor: typeColor[typeName] ?? '#16a34a' }}
                            >
                                {formatText(typeName)}
                            </span>
                        ))}
                    </span>
                </div>

                <h2 className="detail-name">{formatText(data?.name) || '-'}</h2>

                <div className="detail-quick-stats">
                    <span className="detail-quick-stat">
                        <span className="detail-stat-label" style={{ color: '#b91c1c' }}>HP</span>
                        <span>{hp}</span>
                    </span>
                    <span className="detail-quick-stat">
                        <span className="detail-stat-label" style={{ color: '#b91c1c' }}>ATK</span>
                        <span>{atk}</span>
                    </span>
                    <span className="detail-quick-stat">
                        <span className="detail-stat-label" style={{ color: '#1d4ed8' }}>DEF</span>
                        <span>{def}</span>
                    </span>
                </div>

                <div className="detail-info-row">
                    <div className="detail-info-item">
                        <span className="detail-info-label">Altura</span>
                        <span className="detail-info-value">{height}</span>
                    </div>
                    <div className="detail-info-item">
                        <span className="detail-info-label">Peso</span>
                        <span className="detail-info-value">{weight}</span>
                    </div>
                </div>

                {abilities.length > 0 && (
                    <div className="detail-section">
                        <p className="detail-section-title">Habilidades</p>
                        <div className="detail-abilities">
                            {abilities.map((ab) => (
                                <span key={ab} className="detail-ability-badge">{ab}</span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="detail-section">
                    <p className="detail-section-title">Estadísticas</p>
                    {allStats.map(({ label, value, max, color }) => (
                        <div key={label} className="detail-stat-row">
                            <span className="detail-stat-name">{label}</span>
                            <span className="detail-stat-value">{value}</span>
                            <div className="detail-stat-bar-bg">
                                <div
                                    className="detail-stat-bar-fill"
                                    style={{
                                        width: value !== '-' ? `${Math.round((value / max) * 100)}%` : '0%',
                                        backgroundColor: color,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detail;