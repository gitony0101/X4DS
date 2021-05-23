### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ 7c908ac2-b4b4-4f3e-8ba6-31245e8d3716
begin
    using LinearAlgebra
    using Plots
    using DataFrames, CSV
end

# ╔═╡ d7ad7da7-6c9c-4677-859f-745fa72df7ab
X = randn(2, 50)

X[1, 1:25] = X[1, 1:25] .+ 3
X[2, 1:25] = X[2, 1:25] .- 4
scatter(X[1, :], X[2, :], legend=false)

# ╔═╡ dfee67c7-49ba-4bef-96e6-68b92f2e7692
result = kmeans(X, 2)

# ╔═╡ 7aca9adb-0f66-40d6-a793-494e35065862
centers = result.centers

scatter(centers[1, :], centers[2, :], marker = (:hexagon, :red, stroke(3, 0.2, :black, :dot)), label="Centroid")
scatter!(X[1, result.assignments .== 1], X[2, result.assignments .== 1], label="Cluster 1", marker=(:yellow))
scatter!(X[1, result.assignments .== 2], X[2, result.assignments .== 2], label="Cluster 2")

# ╔═╡ 8785b5c6-dbdd-4488-a204-9d0e42d18d72
result = kmeans(X, 3)

# ╔═╡ c85d9c51-f244-4e94-ad92-1d615b08e3b9
centers = result.centers

scatter(centers[1, :], centers[2, :], marker = (:hexagon, :red, stroke(3, 0.2, :black, :dot)), label="Centroid")
scatter!(X[1, result.assignments .== 1], X[2, result.assignments .== 1], label="Cluster 1", marker=(:yellow))
scatter!(X[1, result.assignments .== 2], X[2, result.assignments .== 2], label="Cluster 2", marker=(:green))
scatter!(X[1, result.assignments .== 3], X[2, result.assignments .== 3], label="Cluster 3", marker=(:blue))

# ╔═╡ 77fd1948-39f3-477f-a2aa-f2e20a2385e0


# ╔═╡ Cell order:
# ╠═7c908ac2-b4b4-4f3e-8ba6-31245e8d3716
# ╠═d7ad7da7-6c9c-4677-859f-745fa72df7ab
# ╠═dfee67c7-49ba-4bef-96e6-68b92f2e7692
# ╠═7aca9adb-0f66-40d6-a793-494e35065862
# ╠═8785b5c6-dbdd-4488-a204-9d0e42d18d72
# ╠═c85d9c51-f244-4e94-ad92-1d615b08e3b9
# ╠═77fd1948-39f3-477f-a2aa-f2e20a2385e0
